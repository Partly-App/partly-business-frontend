import { CurrentStruggle, Score, SubScore } from "@/types/profile"
import { createClient } from "@supabase/supabase-js"
import pLimit from "p-limit"
import { Database } from "../types/supabase"

const USER_CONCURRENCY = 4

const getRecentData = async (
  supabase: ReturnType<typeof createClient<Database>>,
  userId: string,
  sevenDaysAgo: string,
) => {
  const [insights, notes, userMomentAnswers, latestScores] = await Promise.all([
    supabase
      .from("insights")
      .select("title, text")
      .gte("createdAt", sevenDaysAgo)
      .eq("userId", userId)
      .limit(5),
    supabase
      .from("notes")
      .select("title, note")
      .gte("createdAt", sevenDaysAgo)
      .eq("userId", userId)
      .limit(5),
    supabase
      .from("userMomentAnswers")
      .select("stepPrompt, answerText")
      .gte("createdAt", sevenDaysAgo)
      .eq("userId", userId)
      .limit(10),
    supabase
      .from("scores")
      .select("id, score, fixSuggestion, reason")
      .order("createdAt", { ascending: false })
      .eq("userId", userId)
      .limit(2),
  ])
  return { insights, notes, userMomentAnswers, latestScores }
}

const getSubScores = async (
  supabase: ReturnType<typeof createClient<Database>>,
  latestScores: Array<Partial<Score>> | null,
) => {
  if (!latestScores?.length) return null

  const subScores = []

  for (const score of latestScores) {
    const { data, error } = await supabase
      .from("subScores")
      .select("type, reason, score")
      .eq("scoreId", score.id!)
      .order("createdAt", { ascending: false })
      .limit(3)
    if (!data || error) {
      continue
    } else {
      subScores.push(data)
    }
  }

  return subScores
}

const requestOpenAiSummary = async (prompt: string) => {
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
  return openAiData
}

const processUser = async (
  supabase: ReturnType<typeof createClient<Database>>,
  userId: string,
) => {
  try {
    const sevenDaysAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000,
    ).toISOString()

    const { insights, notes, userMomentAnswers, latestScores } =
      await getRecentData(supabase, userId, sevenDaysAgo)

    if (latestScores.error || !latestScores.data) {
      throw new Error(`No score for user ${userId}`)
    }

    const subScores = await getSubScores(supabase, latestScores.data)

    const prompt = `
        You are part of an EdTech analytics system.
        Based on the user data below, respond with a JSON object **EXACTLY matching** the structure below.
        Do not add or include any extra fields or keys.
        Do not include comments, explanations, or any other text.

        EXACT OUTPUT: (minified JSON, no whitespace or line breaks)

        {
            "score": {
                "score": number, // 0-100, user's overall well-being score
                "reason": string, // Main reason behind this score
                "fixSuggestion": string // Potential fix suggestions
            },
            "subScores": [
                {
                "type": "anxiety" | "anger" | "confidence",
                "score": number, // 0-100
                "reason": string
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

        Important:
        - Your response must contain **only** the keys and structure above. No other keys.
        - If you provide a key not listed, this is an error.
        - Do not include any key other than "score" and "subScores".
        - No comments, explanations, or meta fields.

        Writing instructions:
        - Use the style of the Co-Star app (without astrology).
        - Reasons and suggestions: second person, direct, min. 2 sentences, varied writing, not poetic, end with e.g. "Your heart is a compass - don't ignore magnets."
        - For each area (Overall, Anxiety, Anger, Confidence), give a broad reason and suggestion.
        - For the "score.reason", do not begin with "Your overall well-being". Start with an original, direct statement.
        - For each "subScores.reason", do not start with "Your anxiety", "Your anger", or "Your confidence". Instead, write full, natural sentences as advice or explanation.
        - Use second person, be direct, minimum 2-3 sentences, avoid repetition in style, do not be poetic, end with sentence like: "Your heart is a compass - don’t ignore magnets."
        - Ensure analytics and writing are different from previous ones in the data and between each other.
        - For subScores: “anxiety” and “anger” up is bad, “confidence” up is good.
        - Note for struggles should explain in depth the struggle with detail while still keeping it anonymized. No personal info.
        - Keep struggle labels and fixTitles very short, max 3 words.

        User data:
        NOTES: ${JSON.stringify(notes.data)}
        INSIGHTS: ${JSON.stringify(insights.data)}
        USER MOMENT ANSWERS: ${JSON.stringify(userMomentAnswers.data)}
        PREVIOUS USER SCORES: ${JSON.stringify(latestScores)}
        PREVIOUS USER SUB SCORES: ${JSON.stringify(subScores)}
    `

    console.log(`Creating summary for user: ${userId}`)

    const openAiData = await requestOpenAiSummary(prompt)
    if (!openAiData.choices) {
      throw new Error(`OpenAI failed for user ${userId}`)
    }
    console.log("OpenAI API tokens consumed:", openAiData.usage)

    const fullMessage = JSON.parse(openAiData.choices[0].message.content)

    const { data: userScoreUpdateData, error: userScoreUpdateError } =
      await supabase
        .from("scores")
        .insert({
          userId: userId,
          score: fullMessage.score.score,
          reason: fullMessage.score.reason,
          fixSuggestion: fullMessage.score.fixSuggestion,
        })
        .select("id")
        .single()

    if (!userScoreUpdateData || userScoreUpdateError) {
      throw new Error(
        `Error inserting new user score: ${userScoreUpdateError?.message}`,
      )
    }

    const subScoresToInsert = fullMessage.subScores.map((item: SubScore) => ({
      ...item,
      scoreId: userScoreUpdateData.id,
    }))

    const { error: userSubScoreUpdateError } = await supabase
      .from("subScores")
      .insert(subScoresToInsert)

    if (userSubScoreUpdateError) {
      console.error(
        "Error inserting user subscores: ",
        userSubScoreUpdateError,
        userId,
      )
    }

    const strugglesToInsert = fullMessage.mainStruggles.map(
      (item: CurrentStruggle) => ({
        ...item,
        userId: userId,
      }),
    )

    const { error: userStruggleUpdate } = await supabase
      .from("currentStruggles")
      .insert(strugglesToInsert)

    if (userStruggleUpdate) {
      console.error(
        "Error inserting user current struggles: ",
        userStruggleUpdate,
        userId,
      )
    }
  } catch (err) {
    console.error(`Error processing user ${userId}:`, err)
  }
}

const fetchAllUserIds = async (
  supabase: ReturnType<typeof createClient<Database>>,
) => {
  let allUsers: { id: string }[] = []
  let from = 0
  const batchSize = 1000
  while (true) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .range(from, from + batchSize - 1)
    if (error) throw error
    if (!data.length) break
    allUsers = allUsers.concat(data)
    if (data.length < batchSize) break
    from += batchSize
  }
  return allUsers
}

const run = async () => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const users = await fetchAllUserIds(supabase)

  const limit = pLimit(USER_CONCURRENCY)
  await Promise.allSettled(
    users.map((user) => limit(() => processUser(supabase, user.id))),
  )
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
