import EmployeesPageContent from "@/components/dashboard/employees/EmployeesPageContent"
import { createClient } from "@/lib/supabaseServer"
import { getCompanyByUser } from "@/services/company"
import { redirect } from "next/navigation"

const EmployeesPage = async () => {
  const data = await getCompanyByUser()

  if (!data?.company) {
    redirect("/")
  }

  const supabaseServer = await createClient()

  const { data: departments, error } = await supabaseServer
    .from("departments")
    .select("id, name")
    .eq("companyId", data.company.id as string)

  if (error) {
    console.error("Error fetching departments: ", error)
  }

  const { data: employees, error: employeesError } = await supabaseServer
    .from("employees")
    .select(
      `
        id,
        department:departmentId (
          id,
          name
        ),
        role,
        companyId,
        profile:userId (
          id,
          fullName,
          avatarUrl
        )
      `,
    )
    .eq("companyId", data.company.id as string)

  if (employeesError) {
    console.error("Error fetching employees: ", employeesError)
  }

  let scoresData = null

  if (employees) {
    const userIds = employees.map((item) => item.profile.id) || []

    const { data: scores, error: scoresError } = await supabaseServer
      .from("scores")
      .select("score, userId")
      .order("createdAt", { ascending: false })
      .in("userId", userIds)
      .limit(employees.length)

    if (!scores || scoresError) {
      console.error("Error getting scores for employee list: ", scoresError)
    } else {
      scoresData = scores
    }
  }

  return (
    <EmployeesPageContent
      departments={departments}
      employees={employees}
      company={data.company}
      scores={scoresData}
    />
  )
}

export default EmployeesPage
