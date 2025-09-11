"use client"

import Toast from "@/components/shared/Toast"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

export type ToastType = "info" | "error" | "success"
export type ToastPosition = "top" | "bottom"

type ToastContextProps = {
  showToast: (
    message: string,
    position?: ToastPosition,
    type?: ToastType,
    delay?: number,
  ) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")
  return context
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{
    message: string
    position: ToastPosition
    type: ToastType
    delay: number
  } | null>(null)
  const [visible, setVisible] = useState(false)

  const showToast = useCallback(
    (
      message: string,
      position: ToastPosition = "bottom",
      type: ToastType = "info",
      delay: number = 2500,
    ) => {
      setToast({ message, position, type, delay })
      setVisible(true)
      setTimeout(() => setVisible(false), delay + 500)
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          position={toast.position}
          type={toast.type}
          delay={toast.delay}
          visible={visible}
          onDismiss={() => setVisible(false)}
        />
      )}
    </ToastContext.Provider>
  )
}
