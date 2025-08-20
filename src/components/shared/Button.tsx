import clsx from "clsx"
import React from "react"

type ButtonColor =
  | "black"
  | "white"
  | "yellow"
  | "purple"
  | "greyLight"
  | "grey"
  | "green"
  | "red"
  | "blue"
  | "transparent"

type ButtonSize = "XS" | "S" | "M" | "L"

type ButtonProps = {
  color: ButtonColor
  size?: ButtonSize
  hasBorder?: boolean
  fullRounded?: boolean
  className?: string
  containerClassName?: string
  containsIconOnly?: boolean
  children?: React.ReactNode
  disabled?: boolean
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

const sizeMap: Record<ButtonSize, string> = {
  XS: "min-h-[24px] min-w-[24px] px-3 py-2",
  S: "min-h-[32px] min-w-[32px] px-3 py-2",
  M: "min-h-[42px] min-w-[42px] px-4 py-3",
  L: "min-h-[52px] min-w-[52px] px-6 py-4",
}

const borderRadiusMap: Record<ButtonSize, string> = {
  XS: "rounded-md",
  S: "rounded-lg",
  M: "rounded-xl",
  L: "rounded-xl",
}

const fontSizeMap: Record<ButtonSize, string> = {
  XS: "text-xs", // 14px
  S: "text-sm", // 14px
  M: "text-base", // 16px
  L: "text-base", // 16px
}

const gapMap: Record<ButtonSize, string> = {
  XS: "gap-2", // 8px
  S: "gap-2", // 8px
  M: "gap-2.5", // 10px
  L: "gap-3.5", // 14px
}

const colorMap: Record<
  ButtonColor,
  { bg: string; text: string; border: string }
> = {
  black: {
    bg: "bg-black-default",
    text: "text-white-default",
    border: "border-white-default",
  },
  white: {
    bg: "bg-white-mellow",
    text: "text-black-default",
    border: "border-black-default",
  },
  yellow: {
    bg: "bg-yellow-default",
    text: "text-black-default",
    border: "border-black-default",
  },
  purple: {
    bg: "bg-purple-default",
    text: "text-white-default",
    border: "border-white-default",
  },
  grey: {
    bg: "bg-grey-dark",
    text: "text-white-default",
    border: "border-white-default",
  },
  greyLight: {
    bg: "bg-grey-default",
    text: "text-white-default",
    border: "border-white-default",
  },
  green: {
    bg: "bg-green-default",
    text: "text-black-default",
    border: "border-black-default",
  },
  red: {
    bg: "bg-red-default",
    text: "text-black-default",
    border: "border-black-default",
  },
  blue: {
    bg: "bg-blue-default-default",
    text: "text-white-default",
    border: "border-white-default",
  },
  transparent: {
    bg: "bg-transparent",
    text: "text-black-default",
    border: "border-black-default",
  },
}

export const Button: React.FC<ButtonProps> = ({
  color,
  size = "M",
  hasBorder,
  fullRounded,
  className,
  containerClassName,
  containsIconOnly,
  children,
  disabled,
  onClick,
  type = "button",
}) => {
  const { bg, text, border } = colorMap[color]

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "flex items-center justify-center font-inter font-medium duration-300",
        "leading-none",
        color === "transparent"
          ? "hover:bg-white-default/25"
          : "hover:bg-opacity-70",
        hasBorder && "border-2",
        hasBorder && border,
        containerClassName,
        sizeMap[size],
        fontSizeMap[size],
        gapMap[size],
        bg,
        text,
        fullRounded ? "rounded-full" : borderRadiusMap[size],
        hasBorder && "border-2",
        hasBorder && border,
        disabled && "pointer-events-none opacity-50",
        containsIconOnly && "aspect-square",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
