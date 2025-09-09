import Button from "@/components/shared/Button"
import EmployeeRow from "./EmployeeRow"
import { EmployeeConstructed } from "./EmployeesPageContent"

type EmployeesProps = {
  employees: Array<EmployeeConstructed>
  scores:
    | {
        score: number
        userId: string
      }[]
    | null
}

const EmployeesList = ({ employees, scores }: EmployeesProps) => {

  const scoreByUserMap = useMemo(() => {
    if (!scores) return {}
    return scores.reduce(
      (acc, curr) => {
        if (!(curr.userId in acc)) {
          acc[curr.userId] = curr.score
        }
        return acc
      },
      {} as Record<string, number>,
    )
  }, [scores])
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center gap-2 px-5 sm:px-9">
        <h1 className="font-montserratAlt text-4xl font-black leading-none">
          Employees
        </h1>
        <Button size="XS" color="transparent" containsIconOnly>
          <span className="font-montserratAlt text-2xl leading-none text-white-default">
            +
          </span>
        </Button>
      </div>
      <div className="flex items-center px-5 sm:px-9">
        <p className="w-1/3 font-bold opacity-50">Name</p>
        <p className="w-1/3 text-center font-bold opacity-50">Department</p>
        <p className="w-1/3 text-right font-bold opacity-50">
          Well-being Score
        </p>
      </div>
      <div className="flex flex-col px-3 sm:px-7">
        {employees?.map((item) => (
          <div key={item.id}>
              <EmployeeRow
                employee={item}
                onClick={openSidebar}
                score={scoreByUserMap[item.profile.id!]}
              />
            <div className="mx-auto h-[1px] w-[98%] bg-white-default/10" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmployeesList
