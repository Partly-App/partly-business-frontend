import clsx from "clsx"
import Image from "next/image"

const AuthHeader = () => {
  return (
    <header className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2">
        <Image
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
      </div>
    </header>
  )
}

export default AuthHeader
