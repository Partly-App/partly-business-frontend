import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

const AppStoreCTA = ({ className }: { className?: string }) => {
  return (
    <Link
      href="https://apps.apple.com/ua/app/partly-confidence-calm/id6745524570"
      target="_blank"
      className={clsx("flex h-fit w-40 items-center justify-center", className)}
    >
      <Image
        src="/images/app-store.webp"
        alt="Download on AppStore"
        width={240}
        height={80}
        className="pointer-events-none select-none"
        priority
      />
    </Link>
  )
}

export default AppStoreCTA
