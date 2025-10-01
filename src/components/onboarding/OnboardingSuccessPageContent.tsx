import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "react-feather"
import Button from "../shared/Button"
import Analytics from "../shared/icons/Analytics"
import Dashboard from "../shared/icons/Dashboard"
import Star from "../shared/icons/Star"
import Users from "../shared/icons/Users"

const OnboardingSuccessPageContent = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-12 pt-6">
      <header className="flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            priority
            src="/images/logo-transparent.webp"
            alt=""
            width={42}
            height={42}
            className="pointer-events-none -mt-2"
          />
          <span
            className={clsx(
              "select-none bg-transparent font-montserratAlt text-xl font-black xs:text-3xl",
              "text-yellow-light",
            )}
            style={{ textShadow: "0px 0px 2px #FFF7DF" }}
          >
            Partly
          </span>
        </Link>

        <Button size="M" color="purple" href="/dashboard">
          Dashboard
          <ArrowRight size={16} className="text-white-default" />
        </Button>
      </header>

      <div className="pt-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-montserratAlt text-6xl font-black text-yellow-default">
            Congratulations! 🎉
          </h1>
          <span className="text-center">
            Your Company is Now on{" "}
            <span
              className="select-none bg-transparent font-montserratAlt font-black text-yellow-light"
              style={{ textShadow: "0px 0px 2px #FFF7DF" }}
            >
              Partly
            </span>
          </span>
        </div>

        <div className="relative mx-auto my-6 h-18 w-6">
          <Image
            fill
            priority
            src="/images/icons/arrow-up-2.png"
            alt=""
            className="rotate-180"
          />
        </div>

        <div className="mx-auto max-w-105 rounded-xl bg-grey-dark px-8 pb-8 pt-4">
          <h2 className="text-center font-montserratAlt text-2xl font-black">
            What&apos;s next
          </h2>

          <div className="mx-auto flex flex-col gap-1 pt-8">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-purple-light">
                  <Dashboard size={20} className="text-purple-light" />
                </div>
                <div className="flex flex-col gap-2 py-2 pl-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">
                  Your company dashboard is ready
                </span>
                <span className="text-xs opacity-50">
                  Manage users, departments, and track team progress from your
                  admin panel
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-purple-light">
                  <Users size={20} className="text-purple-light" />
                </div>
                <div className="flex flex-col gap-2 py-2 pl-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">
                  Invite your team
                </span>
                <span className="text-xs opacity-50">
                  Start by inviting team members to join Partly and begin their
                  learning journeys
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-purple-light">
                  <Star size={20} className="text-purple-light" />
                </div>
                <div className="flex flex-col gap-2 py-2 pl-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">
                  Access premium content
                </span>
                <span className="text-xs opacity-50">
                  Your team can now explore all journeys, with personalized
                  insights and support
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-purple-light">
                  <Analytics size={20} className="text-purple-light" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">
                  Monitor well-being
                </span>
                <span className="text-xs opacity-50">
                  See scores, reasons and suggestions <br />
                  all in one dashboard
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-105 pt-6">
          <Button size="L" color="purple" href="/dashboard">
            Dashboard
            <ArrowRight size={20} className="text-white-default" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingSuccessPageContent
