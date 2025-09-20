import EmployeesPageContent from "@/components/dashboard/employees/EmployeesPageContent"
import { createClient } from "@/lib/supabaseServer"

const EmployeesPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>
}) => {
  const { companyId } = await params

  const supabaseServer = await createClient()

  const { data: departments, error } = await supabaseServer
    .from("departments")
    .select("id, name")
    .eq("companyId", companyId as string)

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
    .eq("companyId", companyId as string)

  if (!employees?.length || employeesError) {
    console.error("Error fetching employees: ", employeesError)
  }

  const userIds = employees?.map((item) => item.profile.id) || []

  const { data: scores, error: scoresError } = await supabaseServer
    .from("scores")
    .select("score, userId")
    .order("createdAt", { ascending: false })
    .in("userId", userIds)

  if (!scores || scoresError) {
    console.error("Error getting scores for employee list: ", scoresError)
  }

  return (
    <EmployeesPageContent
      departments={departments}
      employees={employees}
      companyId={companyId}
      scores={scores}
    />
  )
}

export default EmployeesPage
