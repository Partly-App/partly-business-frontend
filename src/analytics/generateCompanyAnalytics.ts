import { Journey } from "@/types/journey"
import { createClient } from "@supabase/supabase-js"
import { Database } from "../types/supabase"

// This creates scores, subScores and struggles ONLY for company employees

async function run() {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // Fetch companies, profiles, employees, etc
  // Use OpenAI APIs
  // Calculate everything you want
  // Store back to Supabase

  const { data: companyIds, error: companyIdsError } = await supabase
    .from("companies")
    .select("id")
    .limit(2)
  // .limit(9999)

  if (!companyIds?.length || companyIdsError) {
    console.error(companyIdsError)
    throw new Error("Error getting company ids in analytics action")
  }

  for (const item of companyIds) {
    const { data: employees, error: employeesError } = await supabase
      .from("employees")
      .select("id, departmentId, userId")
      .eq("companyId", item.id)

    if (!employees?.length || employeesError) {
      console.error("Error getting employees: ", employeesError)
      throw new Error("Error getting employees")
    }

    for (const employee of employees) {
      let mostEngagedJourney: Journey | null = null

      const { data: progressData, error: progressDataError } = await supabase
        .from("progress")
        .select("journey:journeyId(id, journeyTag)")
        .in("status", ["inProgress", "completed"])
        .eq("userId", employee.userId)

      if (!progressData?.length || progressDataError) {
        console.error("Error getting progress for employee")
        continue
      }

      if (progressData) {
        const counts = progressData.reduce<Record<string, number>>(
          (acc, item) => {
            const tag = item.journey?.journeyTag
            if (tag) acc[tag] = (acc[tag] || 0) + 1
            return acc
          },
          {},
        )

        const mostPopular = Object.entries(counts).sort(
          (a, b) => b[1] - a[1],
        )[0]?.[0] as "anger" | "anxiety" | "confidence" | "shame" | undefined

        mostEngagedJourney = mostPopular ?? null
      }

      const sevenDaysAgo = new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000,
      ).toISOString()

      const { data: conversation, error: conversationError } = await supabase
        .from("conversations")
        .select("id")
        .eq("userId", employee.userId)
        .single()

      if (!conversation || conversationError) {
        console.error("Error getting conversation for employee")
      }

      const recentData = await Promise.all([
        supabase
          .from("insights")
          .select("title, text")
          .gte("createdAt", sevenDaysAgo)
          .eq("userId", employee.userId)
          .limit(5),
        supabase
          .from("notes")
          .select("title, note")
          .gte("createdAt", sevenDaysAgo)
          .eq("userId", employee.userId)
          .limit(5),
        conversation
          ? supabase
              .from("messages")
              .select("title, text")
              .gte("createdAt", sevenDaysAgo)
              .eq("conversationId", conversation.id)
              .limit(20)
          : Promise.resolve({ data: [], error: null }),
        supabase
          .from("userMomentAnswers")
          .select("stepPrompt, answerText")
          .gte("createdAt", sevenDaysAgo)
          .eq("userId", employee.userId)
          .limit(10),
        supabase
          .from("scores")
          .select("id, score, fixSuggestion")
          .order("createdAt", { ascending: false })
          .eq("userId", employee.userId)
          .limit(1)
          .single(),
      ])

      let subScore = null

      if (recentData[4].data?.id) {
        const { data: subScoreData, error: subScoreError } = await supabase
          .from("subScores")
          .select("type, reason, score")
          .eq("scoreId", recentData[4].data?.id)
          .order("createdAt", { ascending: false })
          .limit(3)

        if (!subScoreData || subScoreError) {
          console.error("Error getting sub scores: ", subScoreError)
        } else {
          subScore = subScoreData
        }
      }

      const prompt = `
        You are a part of an emotional EdTech app analytical system aimed at companies and their employees, keep that in mind when giving advice to avoid redirecting users to other forms of education and well-being that are similar to this app. Other things are allowed.
        Given the following user data, return ONLY the following JSON (nothing else):

        {
          "score": {
            "score": number, // 0-100, user's overall well-being score
            "reason": string, // The main reason behind this well-being score
            "fixSuggestion": string // Any potential fix suggestions
          },
          "subScores": [
            {
              "type": "anxiety" | "anger" | "confidence",
              "score": number, // 0-100 for this subscore
              "reason": string // Explanation for this score
            }
          ],
          "mainStruggles": [
            {
              "label": string, // Title of the struggle
              "severity": number, // 0-10 severity score (estimate this from context) (can have 1 decimal number)
              "note": string, // Not or description of a struggle
              "fixTitle": string, // Brief description of a fix
              "fixPoints": string[], // Tips for the fix
              "endNote": string, // Text to end the struggle overview with helpful words of guidance
            }
          ]
        }

        Keep in mind. You are being given the data of employees of a company and you are creating data for the company well-being overview.

        Analyze the user's last 7 days as shown in the data below.
        Provide your answer as pure minified JSON.
        Do not include any other explanation or text.
        Make all the text of notes, reasons, suggestions descriptive, with decent size to it and showcase proper reasoning with examples, while not revealing any personal info.
        Note for struggles should explain in depth the struggle with detail while still keeping it anonymized. No personal info.
        Keep struggle labels and fixTitles very short, max 3 words.
        Keep fixPoints and endNote aimed at the company to allow it to implement about their employees or as a general improvement.

        User data:
        SCORES:
        ${JSON.stringify(recentData[4])}

        SUBSCORES:
        ${JSON.stringify(subScore)}

        NOTES:
        ${JSON.stringify(recentData[1].data)}

        INSIGHTS:
        ${JSON.stringify(recentData[0].data)}

        MESSAGES:
        ${JSON.stringify(recentData[2].data)}

        USER_MOMENT_ANSWERS:
        ${JSON.stringify(recentData[3].data)}
      `

      console.log(
        "Creating summary for employee: ",
        employee.id,
        " from company with id: ",
        item,
      )

      const openAiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4.1-nano",
            messages: [
              {
                role: "developer",
                content: prompt,
              },
            ],
            temperature: 1,
            response_format: { type: "json_object" },
          }),
        },
      )

      const openAiData = await openAiResponse.json()

      console.log("OpenAI API tokens consumed: ", {
        prompt_tokens: openAiData.usage.prompt_tokens,
        completion_tokens: openAiData.usage.completion_tokens,
        total_tokens: openAiData.usage.total_tokens,
      })

      const fullMessage: {
        score: {
          score: number // 0-100, user's overall well-being score
          reason: string // The main reason behind this well-being score
          fixSuggestion: string // Any potential fix suggestions
        }
        subScores: [
          {
            type: "anxiety" | "anger" | "confidence"
            score: number // 0-100 for this subscore
            reason: string // Explanation for this score
          },
        ]
        mainStruggles: [
          {
            label: string // Title of the struggle
            severity: number // 0-10 severity score (estimate this from context) (can have 1 decimal number)
            note: string // Not or description of a struggle
            fixTitle: string // Brief description of a fix
            fixPoints: string[] // Tips for the fix
            endNote: string // Text to end the struggle overview with helpful words of guidance
          },
        ]
      } = JSON.parse(openAiData.choices[0].message.content)

      const { data: userScoreUpdateData, error: userScoreUpdateError } =
        await supabase
          .from("scores")
          .insert({
            userId: employee.userId,
            score: fullMessage.score.score,
            reason: fullMessage.score.reason,
            fixSuggestion: fullMessage.score.fixSuggestion,
          })
          .select("id")
          .single()

      if (!userScoreUpdateData || userScoreUpdateError) {
        console.error(
          "Error inserting new user score: ",
          userScoreUpdateError,
          ". Employee id: ",
          employee.id,
        )
      }

      const subScoresToInsert = Object.values(fullMessage.subScores).map(
        (item) => ({ ...item, scoreId: userScoreUpdateData?.id || "" }),
      )
      const strugglesToInsert = Object.values(fullMessage.mainStruggles).map(
        (item) => ({ ...item, userId: employee.userId }),
      )

      const { error: userSubScoreUpdateError } = await supabase
        .from("subScores")
        .insert(subScoresToInsert)

      if (userSubScoreUpdateError) {
        console.error(
          "Error inserting user subscores: ",
          userScoreUpdateError,
          ". Employee id: ",
          employee.id,
        )
      }

      const { error: userStruggleUpdate } = await supabase
        .from("currentStruggles")
        .insert(strugglesToInsert)

      if (userStruggleUpdate) {
        console.error(
          "Error inserting user current struggles: ",
          userStruggleUpdate,
          ". Employee id: ",
          employee.id,
        )
      }

      const { error: mostEngagedJourneyUpdateError } = await supabase
        .from("employees")
        .update({ mostEngagedJourney })
        .eq("id", employee.id)

      if (mostEngagedJourneyUpdateError) {
        console.error(
          "Error updating employee mostEngagedJourney: ",
          mostEngagedJourneyUpdateError,
          ". Employee id: ",
          employee.id,
        )
      }
    }
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
