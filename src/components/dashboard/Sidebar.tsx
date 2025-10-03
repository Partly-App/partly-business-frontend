"use client"

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { Activity, ChevronsLeft, Table, Users } from "react-feather"
import Support from "../shared/icons/Help"
import Settings from "../shared/icons/Settings"

const TABS = [
  {
    url: "/dashboard",
    label: "Overview",
    icon: <Table size={20} className="shrink-0" />,
  },
  {
    url: "/dashboard/employees",
    label: "Employees",
    icon: <Users size={20} className="shrink-0" />,
  },
  // {
  //   url: "/dashboard/analytics",
  //   label: "Analytics",
  //   icon: <Activity size={20} className="shrink-0" />,
  // },
]

const BOTTOM_TABS = [
  {
    url: "/dashboard/settings",
    label: "Settings",
    icon: <Settings size={20} className="shrink-0" />,
  },
  {
    url: "mailto:support@partly.life",
    label: "Support",
    icon: <Support size={20} className="shrink-0" />,
  },
]

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const pathname = usePathname()

  return (
    <div
      className={clsx(
        "fixed left-0 hidden h-screen flex-col bg-grey-dark py-4 transition-all sm:flex",
        isOpen ? "w-44" : "w-15",
      )}
    >
      <button
        className={clsx(
          "absolute aspect-square w-fit rounded-lg border border-white-default/10 bg-grey-dark p-1.5",
          "-right-4 top-1/2 my-auto transition-colors hover:bg-purple-default hover:text-black-default",
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ChevronsLeft
          size={18}
          className={clsx(
            "transition-transform",
            isOpen ? "rotate-0" : "rotate-180",
          )}
        />
      </button>

      <div className="mb-6 flex h-9 items-center gap-2 px-3">
        <Image
          draggable={false}
          src="/images/logo-transparent.webp"
          alt=""
          width={36}
          height={36}
          className="pointer-events-none -mt-2 shrink-0 select-none"
        />
        {isOpen && (
          <span
            className={clsx(
              "bg-transparent font-montserratAlt text-xl font-black xs:text-3xl",
              "animate-appearFast text-yellow-light opacity-0 [animation-delay:0.1s]",
            )}
            style={{ textShadow: "0px 0px 2px #FFF7DF" }}
          >
            Partly
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between px-3">
        <div className="flex flex-col gap-2">
          {TABS.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              className={clsx(
                "flex w-full items-center gap-3 rounded-lg p-2 transition-colors",
                pathname === item.url
                  ? "bg-purple-default text-black-default"
                  : "hover:bg-white-default/10",
              )}
            >
              {item.icon}
              {isOpen && (
                <span
                  className={clsx(
                    "font-montserratAlt text-sm font-bold leading-none",
                    "animate-appearFast opacity-0 [animation-delay:0.1s]",
                  )}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {BOTTOM_TABS.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              className={clsx(
                "flex w-full items-center gap-3 rounded-lg p-2 transition-colors",
                pathname === item.url
                  ? "bg-purple-default text-black-default"
                  : "text-white-default hover:bg-white-default/10",
              )}
            >
              {item.icon}
              {isOpen && (
                <span
                  className={clsx(
                    "font-montserratAlt text-sm font-bold leading-none",
                    "animate-appearFast opacity-0 [animation-delay:0.1s]",
                  )}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
