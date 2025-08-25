import clsx from "clsx"
import { ReactNode } from "react"

type InfoContainerProps = { className?: string; children: ReactNode }

const InfoContainer = ({ className, children }: InfoContainerProps) => {
  return (
    <div className={clsx("min-h-52 rounded-xl bg-grey-dark p-4", className)}>
      {children}
    </div>
  )
}

export default InfoContainer
