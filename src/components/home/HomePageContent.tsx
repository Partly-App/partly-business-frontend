import Link from "next/link"
import AppStoreCTA from "../shared/AppStoreCTA"
import Button from "../shared/Button"
import FallingMan from "../shared/loaders/FallingMan"

const HomePageContent = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between bg-black-light px-6 pb-10 pt-32">
      <div className="mb-6 flex flex-col items-center">
        <FallingMan size={124} />
        <h1 className="mb-6 text-center font-montserratAlt text-6xl font-black">
          Dashboard coming soon...
        </h1>
        <AppStoreCTA />
      </div>
      <div className="flex items-center justify-center gap-6">
        <Link
          href="https://fragrant-digit-84f.notion.site/Privacy-Policy-22a05fa90ec480edb75ee12ac613b861?source=copy_link"
          target="_blank"
        >
          <Button size="M" color="transparent" className="text-white-default">
            Privacy Policy
          </Button>
        </Link>

        <Link
          href="https://fragrant-digit-84f.notion.site/Terms-of-Use-22a05fa90ec480fcb158fe6fe07c31e5?source=copy_link"
          target="_blank"
        >
          <Button size="M" color="transparent" className="text-white-default">
            Terms of Use
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HomePageContent
