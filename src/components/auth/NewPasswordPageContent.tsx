"use client"

import { useToast } from "@/context/ToastContext"
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as yup from "yup"
import Button from "../shared/Button"
import Input from "../shared/Input"
import Lock from "../shared/icons/Lock"
import { useSupabase } from "../shared/providers"

const DEFAULT_VALUES = { newPassword: "", confirmPassword: "" }

const PasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
})

const NewPasswordPageContent = () => {
  const [value, setValue] = useState(DEFAULT_VALUES)
  const [errors, setErrors] =
    useState<Partial<Record<keyof typeof value, string>>>()

  const supabase = useSupabase()
  const router = useRouter()
  const { showToast } = useToast()

  const handleChange = (
    newValue: string,
    field: "newPassword" | "confirmPassword",
  ) => {
    setValue((prev) => ({
      ...prev,
      [field]: newValue,
    }))
  }

  const handleSubmit = async () => {
    try {
      await PasswordSchema.validate(value, { abortEarly: false })
      setErrors({})

      const { error } = await supabase.auth.updateUser({
        password: value.newPassword,
      })

      if (error) {
        showToast(
          "Unexpected error. Please try again later or email us at support@partly.life",
          "bottom",
          "error",
          5000,
        )
      } else {
        setValue(DEFAULT_VALUES)
        showToast("Password successfully changed!", "bottom", "success", 3000)
        router.push("/auth")
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: Partial<Record<keyof typeof value, string>> = {}
        err.inner.forEach((e) => {
          if (e.path) errors[e.path as keyof typeof value] = e.message
        })
        setErrors(errors)
      }
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-105 flex-1 px-6">
        <div className="mb-8 flex flex-col justify-center gap-2">
          <h1 className="text-center font-montserratAlt text-6xl font-black">
            Reset password
          </h1>
          <span className="text-center">
            Enter your email to get a password reset link
          </span>
        </div>
        <div className="mb-8 flex flex-col gap-4">
          <div>
            <Input
              size="M"
              leftDecorator={
                <Lock size={20} className="text-black-default/25" />
              }
              placeholder="New password"
              value={value.newPassword}
              onChange={(e) => handleChange(e.target.value, "newPassword")}
              className="mb-1"
            />
            {errors?.newPassword && (
              <p className="text-xs text-red-default">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <Input
              size="M"
              leftDecorator={
                <Lock size={20} className="text-black-default/25" />
              }
              placeholder="Confirm password"
              value={value.confirmPassword}
              onChange={(e) => handleChange(e.target.value, "confirmPassword")}
              className="mb-1"
            />
            {errors?.confirmPassword && (
              <p className="text-xs text-red-default">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <Button
          size="L"
          color="purple"
          onClick={handleSubmit}
          className="w-full"
          disabled={
            !value.newPassword.trim().length ||
            !value.confirmPassword.trim().length
          }
        >
          Save new password
        </Button>
      </div>
    </>
  )
}

export default NewPasswordPageContent
