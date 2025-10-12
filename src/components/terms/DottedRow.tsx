import clsx from "clsx"
import { ReactNode } from "react"

const DottedRow = ({
  doublePadding,
  className,
  children,
}: {
  doublePadding?: boolean
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={clsx(
        "mb-2 flex gap-2",
        doublePadding ? "pl-8" : "pl-3",
        className,
      )}
    >
      <span
        className={clsx(
          "font-montserratAlt text-2xl font-black leading-none",
          doublePadding && "opacity-50",
        )}
      >
        •
      </span>
      <p>{children}</p>
    </div>
  )
}

export default DottedRow
