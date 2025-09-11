"use client"

import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { Info, XCircle } from "react-feather"
import CheckCircle from "./icons/CheckCircle"

type ToastProps = {
  message: string
  position: "top" | "bottom"
  type?: "info" | "error" | "success"
  delay?: number
  visible: boolean
  onDismiss: () => void
}

const Toast = ({
  message,
  position,
  type = "info",
  delay = 2500,
  visible,
  onDismiss,
}: ToastProps) => {
  const [show, setShow] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)


  useEffect(() => {
    if (visible) {
      // Next tick to allow initial render with hidden state
      const t = setTimeout(() => setShow(true), 10)
      timeoutRef.current = setTimeout(onDismiss, delay)
      return () => {
        clearTimeout(t)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    } else {
      setShow(false)
    }
  }, [visible, delay, onDismiss])

  return (
    <div
      className={clsx(
        "pointer-events-none fixed left-0 right-0 z-[9999] flex justify-center",
        "transition-all duration-300",
        position === "top" ? "top-6" : "bottom-6",
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-2 rounded-xl px-3 py-2.5 shadow-lg",
          "pointer-events-auto min-w-[220px] max-w-[90vw] transition-all duration-300",
          type === "info"
            ? "bg-white-default"
            : type === "success"
              ? "bg-green-default"
              : "bg-red-default",
          show
            ? "translate-y-0 opacity-100"
            : position === "top"
              ? "-translate-y-8 opacity-0"
              : "translate-y-8 opacity-0",
        )}
        role="alert"
        onClick={onDismiss}
        tabIndex={0}
      >
        <span>
          {type === "info" ? (
            <Info size={20} className="text-black-default" />
          ) : type === "success" ? (
            <CheckCircle size={20} className="text-black-default" />
          ) : (
            <XCircle size={20} className="text-black-default" />
          )}
        </span>
        <span className="flex-1 text-black-default">{message}</span>
      </div>
    </div>
  )
}

export default Toast
