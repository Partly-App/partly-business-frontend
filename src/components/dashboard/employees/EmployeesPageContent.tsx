import { Department, Employee as EmployeeType } from "@/types/employee"
import { Profile } from "@/types/profile"
import Departments from "./Departments"
import EmployeesList from "./EmployeesList"
import { Company } from "@/types/company"

export type EmployeeConstructed = Partial<EmployeeType> & {
  profile: Pick<Profile, "avatarUrl" | "fullName" | "id">
  department: Pick<Department, "id" | "name"> | null
}

export type EmployeesPageContentProps = {
  departments: Array<Partial<Department>> | null
  employees: Array<EmployeeConstructed> | null
  company: Company
  scores:
    | {
        score: number
        userId: string
      }[]
    | null
}

const EmployeesPageContent = ({
  departments,
  employees,
  company,
  scores,
}: EmployeesPageContentProps) => {
  return (
    <main className="realtive flex min-h-screen w-full flex-col py-4 sm:py-8">
      <Departments
        departments={departments}
        employees={employees}
        company={company}
      />
      {employees && (
        <EmployeesList
          employees={employees}
          scores={scores}
          company={company}
        />
      )}
      <div className="mx-auto w-64 px-4"></div>
    </main>
  )
}

export default EmployeesPageContent
