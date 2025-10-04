"use client"

import Button from "@/components/shared/Button"
import Input from "@/components/shared/Input"
import SideSlideModal from "@/components/shared/modals/SideSlideModal"
import {
  MAXIMUM_EMAIL_LENGTH,
  MAXIMUM_ROLE_LENGTH,
} from "@/constants/restrictions"
import { useToast } from "@/context/ToastContext"
import { supabase } from "@/lib/supabaseClient"
import { Department } from "@/types/employee"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import clsx from "clsx"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronDown, MinusCircle, Plus } from "react-feather"
import { v4 as uuidv4 } from "uuid"

type AddEmployeesSideModalProps = {
  isOpen: boolean
  companyId: string
  onClose: () => void
  onExited: () => void
}

const AddEmployeesSideModal = ({
  isOpen,
  companyId,
  onClose,
  onExited,
}: AddEmployeesSideModalProps) => {
  const [employeesToInvite, setEmployeesToInvite] = useState<
    Array<{ id: string; email: string; role: string; departmentId: string }>
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [maxEmployeeCount, setMaxEmployeeCount] = useState(0)
  const [departments, setDepartments] = useState<Array<Partial<Department>>>([])
  const [currentEmployeeCount, setCurrentEmployeeCount] = useState(0)

  const { showToast } = useToast()

  const isDisabled = useMemo(() => {
    return employeesToInvite.length >= maxEmployeeCount - currentEmployeeCount
  }, [employeesToInvite, maxEmployeeCount, currentEmployeeCount])

  const isInviteDisabled = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const hasInvalidEmail = employeesToInvite.some(
      (item) => item.email.length === 0 || !emailRegex.test(item.email),
    )

    return hasInvalidEmail
  }, [employeesToInvite])

  const handleAddEmptyEmployee = useCallback(() => {
    if (isDisabled || !maxEmployeeCount) return

    if (maxEmployeeCount >= currentEmployeeCount) {
      setEmployeesToInvite((prev) => [
        ...prev,
        { id: uuidv4(), email: "", role: "", departmentId: "" },
      ])
    }
  }, [maxEmployeeCount, currentEmployeeCount, isDisabled])

  const handleEmployeeInvites = async () => {
    setIsLoading(true)

    const { error: inviteError } = await supabase.from("invites").upsert(
      employeesToInvite.map((item) => ({
        companyId: companyId as string,
        role: item.role,
        departmentId: item.departmentId,
        email: item.email,
      })),
      { onConflict: "email" },
    )

    if (inviteError) {
      console.error("Error creating invite instances: ", inviteError)
      showToast("Unexpected error! Please, try again later.", "bottom", "error")
      setIsLoading(false)
      return
    }

    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("name")
      .eq("id", companyId as string)
      .single()

    if (!companyData || companyError) {
      console.error("Error getting company name")
    }

    const { error } = await supabase.functions.invoke("sendEmails", {
      body: {
        to: employeesToInvite.map((item) => item.email),
        subject: `${companyData?.name || "Your Workplace"} Wants You to Try Partly — For Free!`,
        templateName: "invite",
        sender: "Partly <info@partly.life>",
        companyId: companyId,
      },
    })

    if (error) {
      console.error(error)
      setIsLoading(false)
      return
    }

    onClose()
    setIsLoading(false)
    showToast(
      "You've invited your employees. Tell them to check their emails!",
      "bottom",
      "success",
      5000,
    )
  }

  useEffect(() => {
    if (!companyId) return

    const getCompanyData = async () => {
      const { data, error } = await supabase
        .from("departments")
        .select("id, name")
        .eq("companyId", companyId as string)

      if (error) {
        console.error("Error fetching departments in EmployeeList: ", error)
      } else if (!!data.length) {
        setDepartments(data)
      }

      const { data: employeeNumberData, error: employeeNumberError } =
        await supabase
          .from("companies")
          .select("numberOfEmployees")
          .eq("id", companyId as string)
          .single()

      if (!employeeNumberData || employeeNumberError) {
        console.error(
          "Error fetching company numberOfEmployees: ",
          employeeNumberError,
        )
        showToast(
          "Unexpected error! Please, try again later.",
          "bottom",
          "error",
        )
        onClose()
        setIsLoading(false)
        return
      }
      setMaxEmployeeCount(employeeNumberData.numberOfEmployees)

      const { count, error: employeeCountError } = await supabase
        .from("employees")
        .select("*", { head: true, count: "exact" })
        .eq("companyId", companyId)

      if (employeeCountError) {
        console.error(
          "Error fetching employee count for a company: ",
          employeeNumberError,
        )
        showToast(
          "Failed to get a proper employee count for your company.",
          "bottom",
          "error",
        )
      }

      setCurrentEmployeeCount(count || 0)
    }

    getCompanyData()
  }, [companyId, onClose, showToast])

  useEffect(() => {
    if (employeesToInvite.length !== 0) return

    handleAddEmptyEmployee()

    setIsLoading(false)
  }, [handleAddEmptyEmployee, employeesToInvite.length])

  useEffect(() => {
    setIsLoading(true)
  }, [])

  return (
    <SideSlideModal
      title="Invite Employees"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onExited={onExited}
      className="!w-[60%]"
      footerClassName="!w-[60%]"
      footer={
        <div className="sticky bottom-0 right-0 flex w-full items-center gap-3 bg-grey-dark py-4">
          <div
            className={clsx(
              "flex-1 rounded-xl p-4",
              "flex aspect-square h-[42px] shrink-0 items-center justify-center",
              "group bg-purple-light transition-opacity",
              isDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:opacity-70",
            )}
            onClick={() => !isDisabled && handleAddEmptyEmployee()}
          >
            <Plus
              size={32}
              className={clsx(
                "transition-colors",
                isDisabled
                  ? "text-grey-dark/50"
                  : "text-black-default group-hover:text-black-default",
              )}
            />
          </div>

          <Button
            size="M"
            color="green"
            disabled={isInviteDisabled}
            containerClassName="flex-1"
            onClick={handleEmployeeInvites}
          >
            Invite
          </Button>
        </div>
      }
    >
      <div className="flex flex-1 flex-col gap-4 pb-12 pt-5">
        <h2 className="font-montserratAlt font-black">
          Available invites:{" "}
          <span className="text-yellow-default">
            {maxEmployeeCount - currentEmployeeCount}
          </span>
        </h2>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto pb-6">
          {employeesToInvite.map((item, i) => (
            <div className="contents" key={item.id}>
              <div className="flex gap-2">
                <span className="w-8 pb-2.5 text-center font-montserratAlt text-xl font-bold leading-none opacity-50">
                  {i + 1}.
                </span>
                <div className="flex flex-1 flex-wrap items-center gap-3">
                  <div className="flex min-w-36 flex-1 flex-col gap-2">
                    <span className="font-montserratAlt font-bold leading-none">
                      Email
                    </span>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      value={item.email}
                      onChange={(e) => {
                        const newValue = e.target.value
                        setEmployeesToInvite((prev) =>
                          prev.map((emp) =>
                            emp.id === item.id
                              ? {
                                  ...emp,
                                  email: newValue.substring(
                                    0,
                                    MAXIMUM_EMAIL_LENGTH,
                                  ),
                                }
                              : emp,
                          ),
                        )
                      }}
                      className="h-12"
                    />
                  </div>
                  <div className="flex min-w-36 flex-1 flex-col gap-2">
                    <span className="font-montserratAlt font-bold leading-none">
                      Role{" "}
                      <span className="text-[8px] font-bold opacity-50">
                        optional
                      </span>
                    </span>
                    <Input
                      placeholder="HR Manager"
                      value={item.role}
                      onChange={(e) => {
                        const newValue = e.target.value
                        setEmployeesToInvite((prev) =>
                          prev.map((emp) =>
                            emp.id === item.id
                              ? {
                                  ...emp,
                                  role: newValue.substring(
                                    0,
                                    MAXIMUM_ROLE_LENGTH,
                                  ),
                                }
                              : emp,
                          ),
                        )
                      }}
                      className="h-12"
                    />
                  </div>
                  <div className="flex min-w-36 flex-1 flex-col gap-2">
                    <span className="font-montserratAlt font-bold leading-none">
                      Department{" "}
                      <span className="text-[8px] font-bold opacity-50">
                        optional
                      </span>
                    </span>
                    <Listbox
                      value={item.departmentId}
                      onChange={(value) => {
                        setEmployeesToInvite((prev) =>
                          prev.map((emp) =>
                            emp.id === item.id
                              ? { ...emp, departmentId: value }
                              : emp,
                          ),
                        )
                      }}
                    >
                      <ListboxButton
                        className={clsx(
                          "relative flex h-12 w-full max-w-56 items-center justify-between gap-2 rounded-lg",
                          "border-2 bg-white-mellow px-2 py-1.5 text-left text-white-default",
                          "transition-colors aria-expanded:border-2 aria-expanded:border-purple-default",
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="truncate text-black-default">
                          {
                            departments.find(
                              (dep) => dep.id === item.departmentId,
                            )?.name
                          }
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
                          "z-50 my-1 flex !max-h-60 flex-col rounded-xl px-2.5 pt-2.5",
                          "data-leave:data-closed:opacity-0 transition duration-100 ease-in focus:outline-none",
                          "w-[var(--button-width)] !overflow-auto bg-white-mellow shadow-md !scrollbar-none",
                        )}
                      >
                        {departments.length ? (
                          departments.map((dep) => (
                            <ListboxOption
                              key={dep.id}
                              value={dep.id}
                              className="pb-1.5"
                            >
                              <div
                                className={clsx(
                                  "group mb-1 flex cursor-pointer select-none items-center gap-2 rounded-lg px-2 py-2.5",
                                  "transition-colors hover:bg-black-default/15",
                                  departments.find(
                                    (department) =>
                                      department.id === item.departmentId,
                                  )?.name === dep.name && "!bg-purple-default",
                                )}
                              >
                                <div className="truncate text-sm font-medium text-black-default">
                                  {dep.name}
                                </div>
                              </div>
                            </ListboxOption>
                          ))
                        ) : (
                          <p className="select-none pb-3 pt-1 text-center font-montserratAlt font-black text-black-default opacity-30">
                            No departments
                          </p>
                        )}
                      </ListboxOptions>
                    </Listbox>
                  </div>
                </div>

                <div
                  className={clsx(
                    "mb-1.5 aspect-square cursor-pointer self-end rounded-md p-2 transition-colors",
                    "hover:bg-white-default/25",
                    employeesToInvite.length === 1 && "pointer-events-none",
                  )}
                  onClick={() =>
                    employeesToInvite.length !== 1 &&
                    setEmployeesToInvite((prev) =>
                      prev.filter((emp) => emp.id !== item.id),
                    )
                  }
                >
                  <MinusCircle
                    size={20}
                    className={clsx(
                      "text-red-default",
                      employeesToInvite.length === 1 && "!opacity-50",
                    )}
                  />
                </div>
              </div>

              <div className="mx-auto h-[1px] w-[98%] bg-white-default/10" />
            </div>
          ))}
        </div>
      </div>
    </SideSlideModal>
  )
}

export default AddEmployeesSideModal
