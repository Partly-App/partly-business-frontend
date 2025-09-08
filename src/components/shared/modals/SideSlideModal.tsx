import { Portal, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, ReactNode } from "react"
import { X } from "react-feather"
import Button from "../Button"
import FallingMan from "../loaders/FallingMan"

type SideSlideModalProps = {
  isOpen: boolean
  title?: string
  isLoading: boolean
  onClose: () => void
  onExited: () => void
  children: ReactNode
}

const SideSlideModal = ({
  title,
  isLoading,
  isOpen,
  onClose,
  onExited,
  children,
}: SideSlideModalProps) => {
  return (
    <Portal>
      <Transition
        appear
        as={Fragment}
        show={isOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 z-30 bg-black-default/30"
          onClick={onClose}
        />
      </Transition>

      <Transition
        appear
        as={Fragment}
        show={isOpen}
        enter="transition-transform duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-200"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        afterLeave={onExited}
      >
        <div
          className={clsx(
            "fixed bottom-0 right-0 top-0 z-50 h-screen md:w-1/2 xl:w-1/3",
            "overflow-y-auto bg-grey-dark p-4 shadow-lg",
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white-default/25",
          )}
        >
          <div className="flex items-center justify-between gap-6">
            <h3 className="font-montserratAlt text-xl font-black">{title}</h3>
            <Button
              color="transparent"
              size="S"
              containsIconOnly
              onClick={onClose}
            >
              <X size={20} className="text-white-default" />
            </Button>
          </div>
          <Transition
            show={isLoading}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
            className="absolute flex h-[90%] w-full items-center justify-center"
          >
            <FallingMan size={120} />
          </Transition>

          <Transition
            show={!isLoading}
            enter="transition-opacity duration-300 delay-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
            className="relative"
          >
            {children}
          </Transition>
        </div>
      </Transition>
    </Portal>
  )
}

export default SideSlideModal
