import clsx from "clsx"
import React from "react"

type ButtonColor =
  | "black"
  | "white"
  | "yellow"
  | "purple"
  | "grey"
  | "green"
  | "red"
  | "blue"
  | "transparent"

type ButtonSize = "S" | "M" | "L"

type ButtonProps = {
  color: ButtonColor
  size?: ButtonSize
  hasBorder?: boolean
  fullRounded?: boolean
  className?: string
  containerClassName?: string
  children?: React.ReactNode
  disabled?: boolean
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

const sizeMap: Record<ButtonSize, string> = {
  S: "min-h-[32px] min-w-[32px] px-2.5 py-2",
  M: "min-h-[42px] min-w-[42px] px-4 py-3",
  L: "min-h-[52px] min-w-[52px] px-6 py-4",
}

const fontSizeMap: Record<ButtonSize, string> = {
  S: "text-sm", // 14px
  M: "text-base", // 16px
  L: "text-base", // 16px
}

const gapMap: Record<ButtonSize, string> = {
  S: "gap-2", // 8px
  M: "gap-2.5", // 10px
  L: "gap-3.5", // 14px
}

const colorMap: Record<
  ButtonColor,
  { bg: string; text: string; border: string }
> = {
  black: {
    bg: "bg-black",
    text: "text-white",
    border: "border-white",
  },
  white: {
    bg: "bg-white-mellow",
    text: "text-black",
    border: "border-black",
  },
  yellow: {
    bg: "bg-yellow",
    text: "text-black",
    border: "border-black",
  },
  purple: {
    bg: "bg-purple",
    text: "text-white",
    border: "border-white",
  },
  grey: {
    bg: "bg-grey-dark",
    text: "text-white",
    border: "border-white",
  },
  green: {
    bg: "bg-green",
    text: "text-black",
    border: "border-black",
  },
  red: {
    bg: "bg-red",
    text: "text-black",
    border: "border-black",
  },
  blue: {
    bg: "bg-blue",
    text: "text-white",
    border: "border-white",
  },
  transparent: {
    bg: "bg-transparent",
    text: "text-black",
    border: "border-black",
  },
}

export const Button: React.FC<ButtonProps> = ({
  color,
  size = "M",
  hasBorder,
  fullRounded,
  className,
  containerClassName,
  children,
  disabled,
  onClick,
  type = "button",
}) => {
  const { bg, text, border } = colorMap[color]

  return (
    <div
      className={clsx(
        "inline-block",
        fullRounded ? "rounded-full" : "rounded-[12px]",
        hasBorder && "border-2",
        hasBorder && border,
        containerClassName,
      )}
    >
      <button
        type={type}
        disabled={disabled}
        className={clsx(
          "flex items-center justify-center font-inter font-medium transition-colors duration-300 hover:bg-opacity-70",
          sizeMap[size],
          fontSizeMap[size],
          gapMap[size],
          bg,
          text,
          fullRounded ? "rounded-full" : "rounded-[12px]",
          hasBorder && "border-2",
          hasBorder && border,
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
