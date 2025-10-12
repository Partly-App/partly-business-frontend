import { ReactNode } from "react"

const BlackText = ({ children }: { children: ReactNode }) => {
  return <span className="font-black">{children}</span>
}

export default BlackText
