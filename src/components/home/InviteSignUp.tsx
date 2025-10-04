"use client"

import { useToast } from "@/context/ToastContext"
import { Transition } from "@headlessui/react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as yup from "yup"
import Button from "../shared/Button"
import Input from "../shared/Input"
import Modal from "../shared/Modal"
import AvatarFilled from "../shared/icons/AvatarFilled"
import Lock from "../shared/icons/Lock"
import MailIcon from "../shared/icons/MailIcon"
import FallingMan from "../shared/loaders/FallingMan"
import { useSupabase } from "../shared/providers"

const DEFAULT_DATA = { name: "", password: "" }

const LoginSchema = yup.object({
  name: yup
    .string()
    .matches(/^[^0-9]*$/, "This field must not contain numbers")
    .required("Name is required")
    .min(2, "Must be at least 2 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Must be at least 6 characters long"),
})

const InviteSignUp = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const params = useSearchParams()
  const companyId = params.get("company-id")
  const email = params.get("email")

  const [logInData, setLogInData] = useState(DEFAULT_DATA)
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof logInData, string>>
  >({})

  const supabase = useSupabase()
  const { showToast } = useToast()

  const handleRegister = async () => {
    if (!companyId || !email) {
      showToast(
        "Unexpected error. Please try again or contact your company admin",
        "bottom",
        "error",
        5000,
      )
      return
    }
    try {
      setIsLoading(true)

      await LoginSchema.validate(logInData, { abortEarly: false })
      setErrors({})

      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("email", email)
        .single()

      if (!data || error) {
        console.error(error)
        showToast(
          "You haven't been invited, please contact your company admin",
          "bottom",
          "error",
          5000,
        )
        setIsLoading(false)
        return
      }

      const { data: newUserData, error: newUserError } =
        await supabase.functions.invoke("createInvitedUser", {
          body: {
            email: email,
            password: logInData.password,
            fullName: logInData.name,
          },
        })

      if (!newUserData || newUserError) {
        console.error("createInvitedUser invokation failed: ", newUserError)
        showToast(
          "Unexpected error while creating your account. Please try again",
          "bottom",
          "error",
          5000,
        )
        setIsLoading(false)
        return
      }

      const { error: employeeInsertError } = await supabase
        .from("employees")
        .insert({
          userId: newUserData.id,
          companyId: companyId,
          departmentId: data.departmentId,
          role: data.role,
        })

      if (employeeInsertError) {
        console.error(
          "Error inserting employee after sign up: ",
          employeeInsertError,
        )
        showToast(
          "Unexpected error while creating your account. Please try again",
          "bottom",
          "error",
          5000,
        )
        setIsLoading(false)
        return
      }

      const { error: deleteInviteError } = await supabase
        .from("invites")
        .delete()
        .eq("email", email)

      if (deleteInviteError) {
        console.error(
          "Error deleting an invite after sign up: ",
          deleteInviteError,
        )
      }

      showToast(
        "You're in! Go ahead and download partly to your phone",
        "bottom",
        "success",
        5000,
      )

      setIsOpen(false)
      setErrors({})
      setLogInData(DEFAULT_DATA)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: Partial<Record<keyof typeof logInData, string>> = {}
        err.inner.forEach((e) => {
          if (e.path) errors[e.path as keyof typeof logInData] = e.message
        })
        setErrors(errors)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (companyId) {
      setIsOpen(true)
    }
  }, [companyId])

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="You've been invited!">
        <Transition
          show={isLoading}
          appear
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          unmount
        >
          <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-grey-dark">
            <FallingMan size={124} className="top-10" />
          </div>
        </Transition>

        <span className="text-xs font-medium opacity-50">
          Register now and get free access to the Partly app
        </span>
        <div className="mb-8 flex flex-col gap-5 pt-6">
          <div className="relative">
            <Input
              disabled
              size="M"
              leftDecorator={
                <MailIcon size={20} className="text-black-default/25" />
              }
              placeholder="Email"
              value={email || ""}
              onChange={() => null}
              className="!cursor-default opacity-50"
            />
          </div>

          <div className="relative">
            <Input
              size="M"
              leftDecorator={
                <AvatarFilled size={20} className="text-black-default/25" />
              }
              placeholder="Name"
              value={logInData.name}
              onChange={(e) =>
                setLogInData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {errors.name && (
              <p className="absolute -bottom-4.5 text-xs text-red-default">
                {errors.name}
              </p>
            )}
          </div>

          <div className="relative">
            <Input
              size="M"
              type="password"
              leftDecorator={
                <Lock size={20} className="text-black-default/25" />
              }
              placeholder="Password"
              value={logInData.password}
              onChange={(e) =>
                setLogInData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {errors.password && (
              <p className="absolute -bottom-4.5 text-xs text-red-default">
                {errors.password}
              </p>
            )}
          </div>
        </div>
        <Button
          size="L"
          color="purple"
          onClick={handleRegister}
          className="mb-2.5 w-full"
        >
          Register
        </Button>
      </Modal>
    </>
  )
}

export default InviteSignUp
