import AuthHeader from "@/components/auth/AuthHeader"
import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col gap-24">
      <AuthHeader />
      {children}
    </main>
  )
}

export default AuthLayout
