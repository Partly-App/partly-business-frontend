import { Transition } from "@headlessui/react"
import Portal from "../Portal"
import FallingMan from "./FallingMan"

const OverlayLoader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Portal>
      <Transition
        show={isLoading}
        appear
        as="div"
        className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black-default/90"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <FallingMan size={164} />
      </Transition>
    </Portal>
  )
}

export default OverlayLoader
