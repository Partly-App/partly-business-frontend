"use client"

import clsx from "clsx"
import { ChangeEvent, InputHTMLAttributes, useState } from "react"

type InputProps = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  size?: "S" | "M"
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "size">

const sizeMap = {
  S: "px-2 py-1.5",
  M: "px-3 py-2.5",
}

const Input = ({
  value,
  onChange,
  size = "M",
  className,
  ...props
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <label
      className={clsx(
        "rounded-lg border-2 border-transparent bg-white-mellow transition-colors",
        "flex w-full items-center justify-between gap-4 focus-within:border-purple-default",
        sizeMap[size],
        className,
      )}
    >
      <input
        {...props}
        type={
          props.type === "password"
            ? hidePassword
              ? "password"
              : "text"
            : props.type
        }
        value={value}
        onChange={onChange}
        className={clsx(
          "leading-0 w-full !bg-transparent text-black-default outline-none",
          "focus:ring-0",
        )}
      />
      {props.type === "password" && (
        <button
          type="button"
          className={clsx(
            "py-1 font-montserratAlt text-sm font-black",
            "leading-none text-black-default opacity-50",
          )}
          onClick={() => setHidePassword((prev) => !prev)}
        >
          {hidePassword ? "Show" : "Hide"}
        </button>
      )}
    </label>
  )
}

export default Input
