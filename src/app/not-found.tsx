import Button from "@/components/shared/Button"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "react-feather"

const NotFoundPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-12 pt-6">
      <header>
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
      </header>

      <div className="mb-10 flex flex-col items-center pt-10">
        <Image
          priority
          src="/images/logo-transparent.webp"
          alt=""
          width={240}
          height={240}
          className="pointer-events-none mb-10"
        />
        <div className="flex max-w-105 flex-col items-center">
          <h1 className="mb-2 text-center font-montserratAlt text-3xl font-black leading-[1.2] text-red-default sm:text-6xl">
            {"Something unexpected happened :("}
          </h1>
          <span className="text-center text-sm opacity-50">
            {"Maybe you've tried accessing a page that isn't there"}
          </span>
        </div>
      </div>

      <Button
        size="L"
        color="white"
        containerClassName="mx-auto w-fit"
        href="/"
      >
        Back to Home Page
        <ArrowRight size={20} className="text-black-default" />
      </Button>
    </div>
  )
}

export default NotFoundPage
