import clsx from "clsx"
import Image from "next/image"
import WellBeingScore from "../WellBeingScore"
import { EmployeeConstructed } from "./EmployeesPageContent"

type EmployeeRowProps = {
  employee: EmployeeConstructed
}

const EmployeeRow = ({ employee }: EmployeeRowProps) => {
  return (
    <div className="flex items-center gap-4 py-1">
      <div
        className={clsx(
          "w-full cursor-pointer rounded-xl px-2 py-3 transition-colors",
          "flex items-center hover:bg-white-default/10",
        )}
      >
        <div className="flex w-1/3 items-center gap-3">
          <Image
            src={
              employee.profile.avatarUrl || "/images/profile-placeholder.png"
            }
            width={42}
            height={42}
            className="rounded-xl"
            alt=""
          />
          <span className="text-sm font-medium sm:text-base">
            {employee.profile.fullName}
          </span>
        </div>

        <div className="flex w-1/3 justify-center">
          {employee.department ? (
            <span className="font-bold">{employee.department.name}</span>
          ) : (
            <span className="font-sm font-bold opacity-25">No department</span>
          )}
        </div>

        <div className="flex w-1/3 justify-end pr-2">
          <WellBeingScore mini size={64} score={50} />
        </div>
      </div>
    </div>
  )
}

export default EmployeeRow
