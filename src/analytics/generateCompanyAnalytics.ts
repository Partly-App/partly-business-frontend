import { Journey } from "@/types/journey"
import { SubScore } from "@/types/profile"
import { createClient } from "@supabase/supabase-js"
import pLimit from "p-limit"
import { Database } from "../types/supabase"

// This creates scores, subScores and struggles ONLY for company employees
// This also creates department scores and subScores

const EMPLOYEE_CONCURRENCY = 4
const DEPARTMENT_CONCURRENCY = 4

const getMostEngagedJourney = (
  progressData: {
    journey: {
      id: string
      journeyTag: "anger" | "anxiety" | "confidence" | "shame"
    } | null
  }[],
): Journey | null => {
  const counts = progressData.reduce<Record<string, number>>(
    (acc, { journey }) => {
      const tag = journey?.journeyTag
      if (tag) acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {},
  )

  const mostPopular = Object.entries(counts).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0] as Journey | undefined

  return mostPopular ?? null
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

const processEmployee = async (
  supabase: ReturnType<typeof createClient<Database>>,
  employee: { id: string; userId: string; departmentId: string | null },
) => {
  try {
    const { data: progressData, error: progressDataError } = await supabase
      .from("progress")
      .select("journey:journeyId(id, journeyTag)")
      .in("status", ["inProgress", "completed"])
      .eq("userId", employee.userId)

    if (progressDataError) throw progressDataError

    const mostEngagedJourney = progressData?.length
      ? getMostEngagedJourney(progressData)
      : null

    const { error: mostEngagedJourneyUpdateError } = await supabase
      .from("employees")
      .update({ mostEngagedJourney })
      .eq("id", employee.id)

    if (mostEngagedJourneyUpdateError) {
      console.error(
        "Error updating employee mostEngagedJourney: ",
        mostEngagedJourneyUpdateError,
        employee.id,
      )
    }
  } catch (err) {
    console.error(`Error processing employee ${employee.id}:`, err)
  }
}

const processDepartment = async (
  supabase: ReturnType<typeof createClient<Database>>,
  company: { id: string },
  department: { id: string },
) => {
  try {
    // Find all employees per department

    const { data: employees, error: employeesError } = await supabase
      .from("employees")
      .select("userId, mostEngagedJourney")
      .eq("departmentId", department.id)

    if (employeesError) throw employeesError

    // Get recent 8 days' data
    // with a bit of play room on dates
    const eightDaysAgo = new Date(
      Date.now() - 8 * 24 * 60 * 60 * 1000,
    ).toISOString()

    const { data: employeeScores, error: employeeScoresError } = await supabase
      .from("scores")
      .select("id, score, reason")
      .in(
        "userId",
        employees.map((item) => item.userId),
      )
      .order("createdAt", { ascending: false })
      .gte("createdAt", eightDaysAgo)

    if (employeeScoresError) throw employeeScoresError

    const { data: employeeSubScores, error: employeeSubScoresError } =
      await supabase
        .from("subScores")
        .select("score, reason")
        .in(
          "scoreId",
          employeeScores.map((item) => item.id),
        )
        .order("createdAt", { ascending: false })
        .gte("createdAt", eightDaysAgo)

    if (employeeSubScoresError) throw employeeSubScoresError

    const prompt = `
      You are a part of an emotional EdTech app analytical system aimed at companies and their employees, keep that in mind when giving advice to avoid redirecting users to other forms of education and well-being that are similar to this app. Other things are allowed.
      Given the following data gathered from department employee analytics, create the following analytical summary for a department of employees and return ONLY the following JSON (nothing else):

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
        ]
      }

      Keep in mind. You are being given the data of employees of a company and you are creating data for the company well-being overview.
      Also keep in mind that subscores anxiety and anger count as bad if the go up, while confidence is good when it's score goes up
      Analyze the employee's last 7 days as shown in the data below.
      Provide your answer as pure minified JSON.
      Do not include any other explanation or text.
      Make all the text of reasons and suggestions descriptive, with decent size to it and showcase proper reasoning with examples, while not revealing any personal info.

      User data:
      EMPLOYEE SCORES: ${JSON.stringify(employeeScores)}
      SUBSCORES: ${JSON.stringify(employeeSubScores)}
    `
    console.log(
      `Creating summary for department: ${department.id} from company: ${company.id}`,
    )

    const openAiData = await requestOpenAiSummary(prompt)
    if (!openAiData.choices) {
      throw new Error(`OpenAI failed for department ${department.id}`)
    }
    console.log("OpenAI API tokens consumed:", openAiData.usage)

    const fullMessage = JSON.parse(openAiData.choices[0].message.content)

    const {
      data: departmentScoreUpdateData,
      error: departmentScoreUpdateError,
    } = await supabase
      .from("departmentScores")
      .insert({
        departmentId: department.id,
        score: fullMessage.score.score,
        reason: fullMessage.score.reason,
        fixSuggestion: fullMessage.score.fixSuggestion,
      })
      .select("id")
      .single()

    if (!departmentScoreUpdateData || departmentScoreUpdateError) {
      throw departmentScoreUpdateError
    }

    const subScoresToInsert = fullMessage.subScores.map((item: SubScore) => ({
      ...item,
      departmentScoreId: departmentScoreUpdateData.id,
    }))

    const { error: departmentSubScoreUpdateError } = await supabase
      .from("departmentSubScores")
      .insert(subScoresToInsert)

    if (departmentSubScoreUpdateError) {
      console.error(
        "Error inserting department subscores: ",
        departmentSubScoreUpdateError,
        department.id,
      )
    }
  } catch (err) {
    console.error(`Error processing department ${department.id}:`, err)
  }
}

const processCompany = async (
  supabase: ReturnType<typeof createClient<Database>>,
  companyId: string,
  departments: Array<{ id: string }>,
) => {
  try {
    const eightDaysAgo = new Date(
      Date.now() - 8 * 24 * 60 * 60 * 1000,
    ).toISOString()

    const departmentIds = departments.map((item) => item.id)

    const { data: departmentScores, error: depScoresError } = await supabase
      .from("departmentScores")
      .select("id, departmentId, score")
      .in("departmentId", departmentIds)
      .gte("createdAt", eightDaysAgo)
      .order("createdAt", { ascending: false })

    if (depScoresError || !departmentScores?.length) {
      throw new Error(`No recent department scores for company ${companyId}`)
    }

    // Using the latest score for each department
    const latestDeptScoresMap = new Map()
    for (const ds of departmentScores) {
      if (!latestDeptScoresMap.has(ds.departmentId)) {
        latestDeptScoresMap.set(ds.departmentId, ds)
      }
    }
    const latestDeptScores = Array.from(latestDeptScoresMap.values())

    const departmentScoreIds = latestDeptScores.map((ds) => ds.id)
    const { data: departmentSubScores, error: depSubScoresError } =
      await supabase
        .from("departmentSubScores")
        .select("type, score")
        .in("departmentScoreId", departmentScoreIds)

    if (depSubScoresError) {
      throw new Error(
        `Error fetching department subscores for company ${companyId}: ${depSubScoresError.message}`,
      )
    }

    // Calculating averages (example: mean company score, mean subScores by type)
    const avg = (arr: number[]) =>
      arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null

    const companyScore = avg(latestDeptScores.map((d) => d.score))

    const subScoreTypes: Array<Journey> = ["anxiety", "anger", "confidence"]
    const companySubScores = subScoreTypes.map((type) => {
      const allTypeSubScores = departmentSubScores
        .filter((sub) => sub.type === type)
        .map((sub) => sub.score)
      return {
        type,
        score: avg(allTypeSubScores),
      }
    })

    const { data: resultCompanyScore, error: companyScoreInsertError } =
      await supabase
        .from("companyScores")
        .insert([
          {
            companyId: companyId,
            score: companyScore as number,
          },
        ])
        .select("id")
        .single()

    if (companyScoreInsertError) {
      throw new Error(
        `Error inserting company score for company ${companyId}: ${companyScoreInsertError.message}`,
      )
    }

    const { error: companySubScoreInsertError } = await supabase
      .from("companySubScores")
      .insert(
        companySubScores.map((item) => ({
          ...item,
          score: item.score as number,
          companyScoreId: resultCompanyScore.id,
        })),
      )

    if (companySubScoreInsertError) {
      throw new Error(
        `Error inserting company sub score for company ${companyId}: ${companySubScoreInsertError.message}`,
      )
    }
  } catch (err) {
    console.error(
      `Error processing overall score for company ${companyId}:`,
      err,
    )
  }
}

const run = async () => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { data: companies, error: companiesErr } = await supabase
    .from("companies")
    .select("id")
    .limit(999)

  if (!companies?.length || companiesErr) {
    console.error(companiesErr)
    throw new Error("Error getting company ids in analytics action")
  }

  for (const company of companies) {
    const { data: employees, error: employeesErr } = await supabase
      .from("employees")
      .select("id, departmentId, userId")
      .eq("companyId", company.id)

    if (!employees?.length || employeesErr) {
      console.error("Error getting employees: ", employeesErr)
      continue
    }

    const limit = pLimit(EMPLOYEE_CONCURRENCY)
    await Promise.all(
      employees.map((emp) => limit(() => processEmployee(supabase, emp))),
    )

    const { data: departments, error: departmentsError } = await supabase
      .from("departments")
      .select("id")
      .eq("companyId", company.id)

    if (!departments || departmentsError) {
      console.error(
        "Error getting departments for the score creation: ",
        departmentsError,
      )
      continue
    }

    const departmentsLimit = pLimit(DEPARTMENT_CONCURRENCY)
    await Promise.all(
      departments.map((dep) =>
        departmentsLimit(() => processDepartment(supabase, company, dep)),
      ),
    )

    await processCompany(supabase, company.id, departments)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
