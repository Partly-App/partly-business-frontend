import NextLink from "next/link"
import { ReactNode } from "react"

const Link = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <NextLink
      href={href}
      target="_blank"
      className="font-bold text-grey-default underline transition-colors hover:text-purple-light"
    >
      {children}
    </NextLink>
  )
}

export default Link
