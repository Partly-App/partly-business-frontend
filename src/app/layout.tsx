import clsx from "clsx"
import type { Metadata } from "next"
import { Inter, Montserrat_Alternates } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const montserratAlt = Montserrat_Alternates({
  variable: "--font-montserratAlt",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Partly",
  description: "Confidence & Calm app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, montserratAlt.variable)}>
        {children}
      </body>
    </html>
  )
}
