import { Department, Employee as EmployeeType } from "@/types/employee"
import { Profile } from "@/types/profile"
import Departments from "./Departments"
import EmployeesList from "./EmployeesList"

export type EmployeeConstructed = Partial<EmployeeType> & {
  profile: Pick<Profile, "avatarUrl" | "fullName" | "id">
  department: Pick<Department, "id" | "name"> | null
}

export type EmployeesPageContentProps = {
  departments: Array<Partial<Department>> | null
  employees: Array<EmployeeConstructed> | null
}

const EmployeesPageContent = ({
  departments,
  employees,
}: EmployeesPageContentProps) => {
  return (
    <main className="realtive min-h-screen w-full py-4 sm:px-4 sm:py-8">
      <Departments departments={departments} employees={employees} />
      {employees && <EmployeesList employees={employees} />}
    </main>
  )
}

export default EmployeesPageContent
