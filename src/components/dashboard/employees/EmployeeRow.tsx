import Input from "@/components/shared/Input"
import { Department } from "@/types/employee"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import clsx from "clsx"
import Image from "next/image"
import { ChevronDown } from "react-feather"
import WellBeingScore from "../WellBeingScore"
import { EmployeeConstructed } from "./EmployeesPageContent"

type EmployeeRowProps = {
  employee: EmployeeConstructed
  onClick: (id: string) => void
  score: number
  isBeingEdited: boolean
  departmentValue: { id: string; name: string } | null
  departmentOnChange: (value: { id: string; name: string }) => void
  roleValue: string
  roleOnChange: (value: string) => void
  allDepartments: Array<Partial<Department>> | null
}

const EmployeeRow = ({
  employee,
  onClick,
  score,
  isBeingEdited,
  departmentValue,
  departmentOnChange,
  roleValue,
  roleOnChange,
  allDepartments,
}: EmployeeRowProps) => {
  return (
    <div className="flex items-center gap-4 py-1">
      <div
        className={clsx(
          "w-full rounded-xl px-2 py-3 transition-colors",
          "flex items-center hover:bg-white-default/10",
          !isBeingEdited && "cursor-pointer",
        )}
        onClick={() => !isBeingEdited && onClick(employee.profile.id!)}
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

        <div className="flex w-1/3 flex-wrap items-center justify-center">
          {isBeingEdited && allDepartments ? (
            <Listbox
              value={departmentValue}
              onChange={(v) => departmentOnChange(v!)}
            >
              <ListboxButton
                className={clsx(
                  "relative flex w-full max-w-56 items-center justify-between gap-2 rounded-lg",
                  "border-2 bg-white-mellow px-2 py-1.5 text-left text-white-default",
                  "transition-colors aria-expanded:border-2 aria-expanded:border-purple-default",
                )}
              >
                <span className="truncate text-black-default">
                  {departmentValue?.name}
                </span>
                <ChevronDown
                  className="group pointer-events-none text-black-default"
                  size={16}
                />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "my-1 flex !max-h-60 w-full !max-w-56 flex-col rounded-xl px-2.5 pt-2",
                  "data-leave:data-closed:opacity-0 transition duration-100 ease-in focus:outline-none",
                  "!overflow-auto bg-white-mellow !scrollbar-none",
                )}
              >
                {allDepartments.map((item) => (
                  <ListboxOption key={item.id} value={item} className="pb-1">
                    <div
                      className={clsx(
                        "group mb-1 flex cursor-pointer select-none items-center gap-2 rounded-lg px-2 py-2.5",
                        "transition-colors hover:bg-black-default/15",
                        departmentValue?.name === item.name &&
                          "!bg-purple-default",
                      )}
                    >
                      <div className="truncate text-sm font-medium text-black-default">
                        {item.name}
                      </div>
                    </div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          ) : employee.department ? (
            <span className="font-medium">{employee.department.name}</span>
          ) : (
            <span className="font-sm font-medium opacity-25">
              No department
            </span>
          )}
          {isBeingEdited ? (
            <div className="my-2 h-[2px] w-16 bg-white-default/25"></div>
          ) : (
            <span className="px-1 font-medium leading-none opacity-50">/</span>
          )}
          {isBeingEdited ? (
            <Input
              value={roleValue}
              onChange={(e) => roleOnChange(e.target.value.substring(0, 30))}
              placeholder="Role"
              size="S"
              className="w-full max-w-56"
            />
          ) : employee.role ? (
            <span className="font-medium">{employee.role}</span>
          ) : (
            <span className="font-sm font-medium opacity-25">No role</span>
          )}
        </div>

        <div className="flex w-1/3 justify-end pr-2">
          <WellBeingScore mini size={64} score={score} />
        </div>
      </div>
    </div>
  )
}

export default EmployeeRow
