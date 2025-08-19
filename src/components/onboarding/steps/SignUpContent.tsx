"use client"

import Button from "@/components/shared/Button"
import Input from "@/components/shared/Input"
import { useSupabase } from "@/components/shared/providers"
import { urls } from "@/constants/urls"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { OnboardingStepType } from "../types"

type SignUpContentProps = OnboardingStepType

const SignUpContent = ({ data: onboardingData }: SignUpContentProps) => {
  const [data, setData] = useState({
    companyName: "",
    name: "",
    email: "",
    password: "",
  })
  const [checked, setChecked] = useState(false)
  const [errors, setErrors] = useState<{
    companyName?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    checked?: boolean
  }>({})
  const [isLoading, setIsLoading] = useState(false)

  const { numberOfEmployees, industry, whatToAchieve } = onboardingData!

  const supabase = useSupabase()
  const router = useRouter()

  const createCompany = async () => {
    if (!whatToAchieve || !numberOfEmployees || !industry) {
      console.error("Data missing for company creation: ", {
        numberOfEmployees,
        industry,
        whatToAchieve,
      })
      setIsLoading(false)
      return {
        companyId: null,
        departmentId: null,
      }
    }

    const { data: companyData, error } = await supabase
      .from("companies")
      .insert({
        name: data.companyName,
        achivementGoals: whatToAchieve?.map((item) => item.label) || null,
        industry,
        numberOfEmployees,
      })
      .select("id")
      .single()

    if (!companyData || error) {
      console.error("Error creating a company: ", error)
      setIsLoading(false)
      return {
        companyId: null,
        departmentId: null,
      }
    }

    const { data: departmentData, error: departmentError } = await supabase
      .from("departments")
      .insert({
        companyId: companyData.id,
        name: "Main department",
      })
      .select("id")
      .single()

    if (!departmentData || departmentError) {
      console.error("Error creating a department: ", departmentError)
      setIsLoading(false)
      return {
        companyId: companyData.id,
        departmentId: null,
      }
    }

    return {
      companyId: companyData.id,
      departmentId: departmentData.id,
    }
  }

  const updateNewProfile = async (userId: string) => {
    const { companyId, departmentId } = await createCompany()

    const { error } = await supabase
      .from("profiles")
      .update({
        fullName: data.name,
        companyRole: "Admin",
        companyId,
        departmentId,
      })
      .eq("id", userId)

    if (error) {
      console.log(error)
      setIsLoading(false)
      return
    }
  }

  const createInitialProgress = async (userId: string) => {
    const { error } = await supabase.from("progress").insert({
      userId: userId,
      journeyId: null,
      pathId: "25d53972-53c6-447f-85bd-0d87c21b4bc5",
      momentId: "2ed25678-8b8e-4230-8067-7fa56f7790c9", // first moment of path 0
      currentStepIndex: 1,
      answers: null,
      status: "inProgress",
    })

    if (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const signUpNewUser = async () => {
    setIsLoading(true)

    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    const newErrors: typeof errors = {
      companyName: !data.companyName,
      name: !data.name,
      email: !data.email,
      password: !data.password,
      checked: !checked,
    }
    setErrors(newErrors)

    // If any error, do not proceed
    if (
      newErrors.companyName ||
      newErrors.name ||
      newErrors.email ||
      newErrors.password ||
      newErrors.checked
    ) {
      setIsLoading(false)
      return
    }

    if (!signUpData || error) {
      console.error("Email Sign up error: ", error)
      setIsLoading(false)
      return
    }

    const userId = signUpData.user?.id

    if (!userId) {
      console.error("No userId on signUp")
      setIsLoading(false)
      return
    }

    await updateNewProfile(userId)
    await createInitialProgress(userId)

    setIsLoading(false)

    router.push("/onboarding/welcome")
  }

  // the problem here is oauth redirects you and you lose data gathered during onboarding
  // and if I use sessionStorage then I still won't be able to gather company name and user name

  // const signInWithGoogle = async () => {
  //   sessionStorage.setItem(
  //     "onboardingData",
  //     JSON.stringify({ ...data, ...onboardingData }),
  //   )

  //   await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: `${window.location.origin}/onboarding/`,
  //     },
  //   })
  // }

  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-12 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          Create your team account and{" "}
          <span className="font-montserratAlt font-black text-yellow-default">
            start feeling better
          </span>
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Input
            value={data.companyName}
            onChange={(e) =>
              setData((prev) => ({ ...prev, companyName: e.target.value }))
            }
            placeholder="Company name"
          />
          {errors.companyName && (
            <span className="text-xs font-medium text-red-default">
              Company name is required
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            name="name"
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Your name"
          />
          {errors.name && (
            <span className="text-xs font-medium text-red-default">
              Name is required
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            type="email"
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Work email"
          />
          {errors.email && (
            <span className="text-xs font-medium text-red-default">
              Email is required
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            type="password"
            value={data.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-xs font-medium text-red-default">
              Password is required
            </span>
          )}
        </div>
      </div>

      <div className="mb-1 mt-5 flex items-center gap-1">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="peer hidden"
            onChange={() => setChecked((prev) => !prev)}
          />
          <span
            className={clsx(
              "h-4 w-4 aspect-square rounded-sm bg-white-mellow transition-colors",
              "peer-checked:border-purple-default peer-checked:bg-purple-default",
            )}
          />
          <span className="text-xs leading-none opacity-50">
            I agree to Partly{" "}
            <Link
              href={urls.privacyPolicy}
              className="underline transition-colors duration-100 hover:text-purple-light"
              target="_blank"
            >
              Privacy Policy
            </Link>
            ,{" "}
            <Link
              href={urls.termsAndConditions}
              className="underline transition-colors duration-100 hover:text-purple-light"
              target="_blank"
            >
              Terms & Conditions
            </Link>
          </span>
        </label>
      </div>
      {errors.checked && (
        <span className="text-xs font-medium text-red-default">
          This field is required
        </span>
      )}

      <Button
        size="L"
        color="purple"
        className="mt-12 w-full"
        disabled={isLoading}
        onClick={signUpNewUser}
      >
        Continue
      </Button>

      {/* <div className="mt-4 flex flex-col gap-4">
        <span className="block text-center font-montserratAlt font-black opacity-25">
          OR
        </span>
        <Button size="M" color="white" onClick={signInWithGoogle}>
          <GoogleIcon size={22} />
          Sign in with Google
        </Button>
      </div> */}
    </section>
  )
}

export default SignUpContent
