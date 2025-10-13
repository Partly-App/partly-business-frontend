"use client"

import { urls } from "@/constants/urls"
import Image from "next/image"
import Link from "next/link"
import AppStoreCTA from "../shared/AppStoreCTA"
import Button from "../shared/Button"

const Footer = () => {
  return (
    <footer className="mx-auto mt-32 flex max-w-160 flex-col items-center justify-center gap-6 px-6 pb-12">
      <div className="flex items-center justify-center gap-4">
        <Link
          href={urls.privacyPolicy}
          target="_blank"
          className="text-sm font-bold opacity-30 transition-opacity hover:opacity-50"
        >
          Privacy Policy
        </Link>
        <Link
          href={urls.termsOfUse}
          target="_blank"
          className="text-sm font-bold opacity-30 transition-opacity hover:opacity-50"
        >
          Terms of Use
        </Link>
        <Link
          href={urls.refundPolicy}
          target="_blank"
          className="text-sm font-bold opacity-30 transition-opacity hover:opacity-50"
        >
          Refund Policy
        </Link>
      </div>

      <AppStoreCTA />

      <div className="flex items-center gap-3">
        <Button
          containsIconOnly
          size="S"
          color="transparent"
          href="https://tiktok.com/@partly_app"
          target="_blank"
        >
          <Image
            alt="TikTok"
            src="/images/icons/socials/tiktok.svg"
            height={20}
            width={20}
          />
        </Button>
        <Button
          containsIconOnly
          size="S"
          color="transparent"
          href="https://www.instagram.com/partly_app/"
          target="_blank"
        >
          <Image
            alt="Instagram"
            src="/images/icons/socials/instagram.svg"
            height={20}
            width={20}
          />
        </Button>
      </div>

      <div
        className="cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Image
          src="/images/logo-transparent.webp"
          width={64}
          height={64}
          alt=""
        />
      </div>
    </footer>
  )
}

export default Footer
