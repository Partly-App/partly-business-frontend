import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import clsx from "clsx"
import { Dispatch, Fragment, ReactNode, SetStateAction } from "react"
import { X } from "react-feather"
import Button from "./Button"

type ModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  title?: string
  children: ReactNode
}

const Modal = ({ isOpen, setIsOpen, title, children }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black-default/50" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              className={clsx(
                "w-full max-w-lg transform overflow-hidden rounded-2xl relative",
                "bg-grey-dark px-6 py-4 text-left align-middle shadow-xl transition-all",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-wrap font-montserratAlt text-3xl font-black">
                  {title}
                </h3>
                <Button
                  containsIconOnly
                  size="XS"
                  color="transparent"
                  containerClassName="shrink-0"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} color="white" />
                </Button>
              </div>
              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
