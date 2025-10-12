import clsx from "clsx"
import { ReactNode } from "react"

const Heading = ({
  size = "M",
  children,
}: {
  size?: "S" | "M"
  children: ReactNode
}) => {
  return (
    <h2
      className={clsx(
        "mb-3 font-montserratAlt font-black",
        size === "S" ? "text-xl" : "text-4xl",
      )}
    >
      {children}
    </h2>
  )
}

export default Heading
