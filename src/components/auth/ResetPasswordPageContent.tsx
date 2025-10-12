"use client"

import { useToast } from "@/context/ToastContext"
import { useState } from "react"
import Button from "../shared/Button"
import Input from "../shared/Input"
import MailIcon from "../shared/icons/MailIcon"
import OverlayLoader from "../shared/loaders/OverlayLoader"
import { useSupabase } from "../shared/providers"

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const ResetPasswordPageContent = () => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const supabase = useSupabase()
  const { showToast } = useToast()

  const handleReset = async () => {
    setEmailError("")

    if (!email.trim()) {
      setEmailError("Email is required.")
      return
    }
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.")
      return
    }

    setIsLoading(true)

    const { error: existError, count } = await supabase
      .from("profiles")
      .select("id", { head: true, count: "exact" })
      .eq("email", email)

    if (existError) {
      showToast(
        "Unexpected error while sending email. Try again later please.",
        "bottom",
        "error",
      )
      setIsLoading(false)
      return
    }
    if (!count || count === 0) {
      showToast("No user with this email exists.", "bottom", "info", 5000)
      setIsLoading(false)
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/confirm`,
    })

    if (error) {
      showToast(
        "Unexpected error while sending email. Try again later please.",
        "bottom",
        "error",
      )
      setEmailError(error.message || "Could not send reset email.")
    } else {
      showToast(
        "Check your email for further instructions",
        "bottom",
        "success",
        5000,
      )
    }

    setIsLoading(false)
  }

  return (
    <>
      <OverlayLoader isLoading={isLoading} />
      <div className="mx-auto w-full max-w-105 flex-1 px-6">
        <div className="mb-8 flex flex-col justify-center gap-2">
          <h1 className="text-center font-montserratAlt text-6xl font-black">
            Reset password
          </h1>
          <span className="text-center">
            Enter your email to get a password reset link
          </span>
        </div>
        <div className="mb-8 flex flex-col gap-5">
          <div>
            <Input
              size="M"
              leftDecorator={
                <MailIcon size={20} className="text-black-default/25" />
              }
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2"
            />
            {emailError && (
              <p className="text-xs text-red-default">{emailError}</p>
            )}
          </div>

          <Button
            size="L"
            color="purple"
            onClick={handleReset}
            className="w-full"
            disabled={!email.trim().length}
          >
            Reset password
          </Button>
        </div>
      </div>
    </>
  )
}

export default ResetPasswordPageContent
