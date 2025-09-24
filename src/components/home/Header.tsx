import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import Button from "../shared/Button"

const Header = () => {
  return (
    <div className="fixed left-0 right-0 top-6 z-20 px-4">
      <div className="flex w-full items-center justify-between rounded-2xl bg-grey-dark py-3 pl-3 pr-4">
        <Link href="/" className="flex cursor-pointer items-center gap-3">
          <Image
            src="/images/logo-transparent.webp"
            alt=""
            width={52}
            height={52}
            className="pointer-events-none -mt-2"
          />
          <span
            className={clsx(
              "select-none bg-transparent font-montserratAlt text-xl font-black xs:text-4xl",
              "text-yellow-light",
            )}
            style={{ textShadow: "0px 0px 2px #FFF7DF" }}
          >
            Partly
          </span>
        </Link>

        <Button size="M" color="purple" href="/dashboard">
          Dashboard
        </Button>
      </div>
    </div>
  )
}

export default Header
