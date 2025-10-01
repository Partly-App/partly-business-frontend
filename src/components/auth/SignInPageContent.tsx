"use client"

import { useToast } from "@/context/ToastContext"
import clsx from "clsx"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as yup from "yup"
import Button from "../shared/Button"
import Input from "../shared/Input"
import AppleIcon from "../shared/icons/Apple"
import GoogleIcon from "../shared/icons/Google"
import Lock from "../shared/icons/Lock"
import MailIcon from "../shared/icons/MailIcon"
import { useSupabase } from "../shared/providers"

const DEFAULT_DATA = { email: "", password: "" }

const LoginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup.string().required("Password is required"),
})

const SignInPageContent = () => {
  const [logInData, setLogInData] = useState(DEFAULT_DATA)
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof logInData, string>>
  >({})

  const params = useSearchParams()
  const signOutReason = params.get("sign-out-reason")

  const supabase = useSupabase()
  const router = useRouter()
  const { showToast } = useToast()

  const handleLogin = async () => {
    try {
      await LoginSchema.validate(logInData, { abortEarly: false })
      setErrors({})

      const { data, error } = await supabase.auth.signInWithPassword({
        email: logInData.email,
        password: logInData.password,
      })

      if (error || !data.user) {
        console.error("Error logging in with email: ", error)
        if (error?.status === 400) {
          showToast(
            "User doesn't exist, register first.",
            "bottom",
            "error",
            5000,
          )
        } else {
          showToast("Unexpected error. Please try again", "bottom", "error")
        }
        return
      }

      router.push("/dashboard")
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: Partial<Record<keyof typeof logInData, string>> = {}
        err.inner.forEach((e) => {
          if (e.path) errors[e.path as keyof typeof logInData] = e.message
        })
        setErrors(errors)
      }
    }
  }

  const handleSignIn = async (provider: "google" | "apple") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) {
      console.error("Error logging in with ", provider, " ", error)
      showToast("Unexpected error. Please try again", "bottom", "error")
      return
    }

    router.push("/dashboard")
  }

  useEffect(() => {
    if (signOutReason === "not-admin") {
      showToast("User is not an admin of the company.", "bottom", "info")
    } else if (signOutReason === "error") {
      showToast(
        "Unexpected error happened, pls try again later.",
        "bottom",
        "error",
      )
    }
  }, [signOutReason, showToast])

  return (
    <>
      <div className="mx-auto w-full max-w-105 flex-1 px-6">
        <h1 className="mb-6 text-center font-montserratAlt text-6xl font-black">
          Log in
        </h1>
        <div className="mb-8 flex flex-col gap-5">
          <div className="relative">
            <Input
              size="M"
              leftDecorator={
                <MailIcon size={20} className="text-black-default/25" />
              }
              placeholder="Email"
              value={logInData.email}
              onChange={(e) =>
                setLogInData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {errors.email && (
              <p className="absolute -bottom-4.5 text-xs text-red-default">
                {errors.email}
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
          onClick={handleLogin}
          className="w-full"
        >
          Log in
        </Button>

        <div className="flex items-center gap-1 py-4">
          <div className="h-0.5 flex-1 rounded-full bg-white-default/25" />
          <span className="font-montserratAlt font-black text-white-default/25">
            OR
          </span>
          <div className="h-0.5 flex-1 rounded-full bg-white-default/25" />
        </div>

        <div className="flex items-center gap-4">
          <Button
            color="white"
            size="M"
            className="flex-1"
            onClick={() => handleSignIn("google")}
          >
            <GoogleIcon size={20} />
          </Button>
          <Button
            color="white"
            size="M"
            className="flex-1"
            onClick={() => handleSignIn("apple")}
          >
            <AppleIcon size={20} />
          </Button>
        </div>

        <div className="flex items-center gap-1 py-4">
          <div className="h-0.5 flex-1 rounded-full bg-white-default/25" />
          <span className="font-montserratAlt font-black text-white-default/25">
            OR
          </span>
          <div className="h-0.5 flex-1 rounded-full bg-white-default/25" />
        </div>

        <Link
          href="/auth/reset-password"
          className={clsx(
            "mb-4 block w-fit font-bold text-grey-default",
            "mx-auto transition-colors hover:text-purple-default",
          )}
        >
          Reset Password
        </Link>

        <Link
          href="/onboarding"
          className={clsx(
            "block w-fit font-bold text-grey-default",
            "mx-auto transition-colors hover:text-purple-default",
          )}
        >
          Register
        </Link>
      </div>
    </>
  )
}

export default SignInPageContent
