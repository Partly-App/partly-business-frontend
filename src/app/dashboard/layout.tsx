import Sidebar from "@/components/dashboard/Sidebar"
import { ReactNode } from "react"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}

export default DashboardLayout
