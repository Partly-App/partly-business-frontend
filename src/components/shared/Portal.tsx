"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const Portal = ({ children }: { children: React.ReactNode }) => {
  const elRef = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!elRef.current) {
      elRef.current = document.createElement("div")
    }
    const portalRoot = document.body
    portalRoot.appendChild(elRef.current)

    setMounted(true)

    return () => {
      if (elRef.current) {
        portalRoot.removeChild(elRef.current)
      }
    }
  }, [])

  if (!mounted || !elRef.current) return null

  return createPortal(children, elRef.current)
}

export default Portal
