"use client"

import MobileMenu from "@/components/dashboard/MobileMenu"
import Sidebar from "@/components/dashboard/Sidebar"
import clsx from "clsx"
import { ReactNode, useState } from "react"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileMenu />
      <main
        className={clsx("transition-all", isOpen ? "sm:pl-44" : "sm:pl-15")}
      >
        {children}
      </main>
    </>
  )
}

export default DashboardLayout
