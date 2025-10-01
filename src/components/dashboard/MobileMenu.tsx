import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Table, Users } from "react-feather"
import Support from "../shared/icons/Help"
import Settings from "../shared/icons/Settings"

const LINKS = [
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
  {
    url: "/dashboard/analytics",
    label: "Analytics",
    icon: <Activity size={20} className="shrink-0" />,
  },
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

const MobileMenu = () => {
  const pathname = usePathname()

  return (
    <div
      className={clsx(
        "fixed bottom-0 z-10 flex w-full justify-center gap-3 bg-grey-dark px-3 py-2",
        "xs:gap-6 sm:hidden",
      )}
    >
      {LINKS.map((item) => (
        <Link
          className={clsx(
            "flex flex-col items-center gap-1 rounded-lg p-2 transition-colors",
            pathname === item.url
              ? "bg-purple-default text-black-default"
              : "hover:bg-white-default/10",
          )}
          href={item.url}
        >
          {item.icon}
          <span
            className={clsx(
              "text-[8px] font-bold",
              pathname === item.url
                ? "text-black-default"
                : "text-white-default/50",
            )}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default MobileMenu
