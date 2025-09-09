import EmployeesPageContent from "@/components/dashboard/employees/EmployeesPageContent"
import { createClient } from "@/lib/supabaseServer"

const EmployeesPage = async ({ params }: { params: { companyId: string } }) => {
  const { companyId } = await params

  const supabaseServer = await createClient()

  const { data: departments, error } = await supabaseServer
    .from("departments")
    .select("id, name")
    .eq("companyId", companyId as string)

  if (error) {
    console.log("Error fetching departments: ", error)
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
        profile:userId (
          id,
          fullName,
          avatarUrl
        )
      `,
    )
    .eq("companyId", companyId as string)

  if (!employees?.length || employeesError) {
    console.log("Error fetching employees: ", employeesError)
  }

  return (
    <EmployeesPageContent departments={departments} employees={employees} companyId={companyId} />
  )
}

export default EmployeesPage
