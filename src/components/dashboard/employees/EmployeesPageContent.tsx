import { Department, Employee } from "@/types/employee"
import { Profile } from "@/types/profile"
import Departments from "./Departments"

export type EmployeesPageContentProps = {
  departments: Array<Partial<Department>> | null
  employees: Array<Partial<Employee> & { profile: Partial<Profile> }> | null
}

const EmployeesPageContent = ({
  departments,
  employees,
}: EmployeesPageContentProps) => {
  return (
    <main className="realtive min-h-screen w-full py-4">
      <Departments departments={departments} employees={employees} />
    </main>
  )
}

export default EmployeesPageContent
