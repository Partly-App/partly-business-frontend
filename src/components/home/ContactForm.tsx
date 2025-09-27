"use client"

import { useState } from "react"
import Button from "../shared/Button"
import Input from "../shared/Input"
import AvatarFilled from "../shared/icons/AvatarFilled"
import CompanyIcon from "../shared/icons/CompantIcon"
import EmployeeBadge from "../shared/icons/EmployeeBadge"
import MailIcon from "../shared/icons/MailIcon"
import FallingMan from "../shared/loaders/FallingMan"

import { useToast } from "@/context/ToastContext"
import clsx from "clsx"
import * as yup from "yup"
import { useSupabase } from "../shared/providers"

const DEFAULT_VALUES = {
  name: "",
  corporateEmail: "",
  companyName: "",
  countOfEmployees: "",
  message: "",
}

const ContactSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  corporateEmail: yup
    .string()
    .required("Corporate email is required")
    .email("Must be a valid email"),
  companyName: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be at most 100 characters"),
  countOfEmployees: yup
    .number()
    .typeError("Must be a valid number")
    .integer("Must be an integer")
    .min(5, "Must be at least 5")
    .required("Count of employees is required"),
  message: yup
    .string()
    .max(1000, "Message must be at most 1000 characters")
    .notRequired(),
})

const ContactForm = () => {
  const [value, setValue] = useState(DEFAULT_VALUES)
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof value, string>>
  >({})

  const supabase = useSupabase()
  const { showToast } = useToast()

  const handleChange = (
    newValue: string,
    field:
      | "name"
      | "corporateEmail"
      | "companyName"
      | "countOfEmployees"
      | "message",
  ) => {
    setValue((prev) => ({
      ...prev,
      [field]: newValue,
    }))
  }

  const handleSubmit = async () => {
    try {
      const formToValidate = {
        ...value,
        countOfEmployees: Number(value.countOfEmployees),
      }
      await ContactSchema.validate(formToValidate, { abortEarly: false })
      setErrors({})

      const { error } = await supabase.from("contacts").insert({
        ...value,
        countOfEmployees: parseFloat(value.countOfEmployees),
      })

      if (error) {
        showToast(
          "Unexpected error. Please email us at info@partly.life",
          "bottom",
          "error",
          5000,
        )
      } else {
        setValue(DEFAULT_VALUES)
        showToast(
          "Thanks for reaching out to us. We'll contact you shortly!",
          "bottom",
          "success",
          3000,
        )
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
    <section className="px-4 pt-24">
      <div
        className={clsx(
          "mx-auto grid max-w-5xl gap-5 rounded-xl bg-grey-dark px-5 py-8",
          "sm:grid-cols-2 lg:gap-10",
        )}
      >
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="mb-3 font-montserratAlt text-6xl font-black">
              Contact us
            </h3>
            <span>
              Fill out the form to book a call and learn more about{" "}
              <span className="font-montserratAlt font-black text-yellow-light">
                Partly for Business
              </span>
            </span>
          </div>

          <div className="hidden flex-1 items-center justify-center pt-10 sm:flex">
            <FallingMan size={124} />
          </div>
        </div>

        <div>
          <div className="mb-10 flex flex-col gap-5">
            <div className="relative">
              <Input
                size="M"
                placeholder="Name"
                name="name"
                value={value.name}
                onChange={(e) => handleChange(e.target.value, "name")}
                leftDecorator={
                  <AvatarFilled size={24} className="text-black-default" />
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
                placeholder="Corporate email"
                name="email"
                value={value.corporateEmail}
                onChange={(e) => handleChange(e.target.value, "corporateEmail")}
                leftDecorator={
                  <MailIcon size={24} className="text-black-default" />
                }
              />
              {errors.corporateEmail && (
                <p className="absolute -bottom-4.5 text-xs text-red-default">
                  {errors.corporateEmail}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                size="M"
                placeholder="Company name"
                value={value.companyName}
                onChange={(e) => handleChange(e.target.value, "companyName")}
                leftDecorator={
                  <CompanyIcon size={24} className="text-black-default" />
                }
              />
              {errors.companyName && (
                <p className="absolute -bottom-4.5 text-xs text-red-default">
                  {errors.companyName}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                size="M"
                placeholder="Count of employees"
                type="number"
                value={value.countOfEmployees}
                onChange={(e) =>
                  handleChange(e.target.value, "countOfEmployees")
                }
                leftDecorator={
                  <EmployeeBadge size={24} className="text-black-default" />
                }
              />
              {errors.countOfEmployees && (
                <p className="absolute -bottom-4.5 text-xs text-red-default">
                  {errors.countOfEmployees}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                size="M"
                placeholder="Add message"
                value={value.message}
                onChange={(e) => handleChange(e.target.value, "message")}
              />
              {errors.message && (
                <p className="absolute -bottom-4.5 text-xs text-red-default">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <Button
            size="L"
            color="purple"
            onClick={handleSubmit}
            containerClassName="w-full"
          >
            Contact us
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
