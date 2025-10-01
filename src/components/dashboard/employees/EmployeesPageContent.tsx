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
  companyId: string
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
  companyId,
  scores,
}: EmployeesPageContentProps) => {
  return (
    <main className="realtive flex min-h-screen w-full flex-col py-4 sm:py-8">
      <Departments
        departments={departments}
        employees={employees}
        companyId={companyId}
      />
      {employees && (
        <EmployeesList
          employees={employees}
          scores={scores}
          companyId={companyId}
        />
      )}
      <div className="mx-auto w-64 px-4"></div>
    </main>
  )
}

export default EmployeesPageContent
