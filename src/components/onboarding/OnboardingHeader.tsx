import clsx from "clsx"
import Image from "next/image"
import { ArrowLeft } from "react-feather"
import Button from "../shared/Button"

type OnboardingHeaderProps = {
  currentStep: number
  totalSteps: number
  onBack: () => void
}

const OnboardingHeader = ({
  currentStep,
  totalSteps,
  onBack,
}: OnboardingHeaderProps) => {
  return (
    <header className="px-8 py-4">
      <div className="flex items-center justify-between pb-4">
        <Button
          size="S"
          color="grey"
          onClick={onBack}
          className={clsx(
            "transition-opacity duration-500",
            currentStep === 1 || currentStep === totalSteps
              ? "pointer-events-none !opacity-0"
              : "opacity-100",
          )}
        >
          <ArrowLeft size={16} className="text-white-default" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo-transparent.webp"
            alt=""
            width={42}
            height={42}
            className="pointer-events-none -mt-2"
          />
          <span
            className={clsx(
              "select-none bg-transparent font-montserratAlt text-xl font-black xs:text-3xl",
              "text-yellow-light",
            )}
            style={{ textShadow: "0px 0px 2px #FFF7DF" }}
          >
            Partly
          </span>
        </div>
        <div
          className={clsx(
            "flex min-w-20 justify-end transition-opacity duration-500",
            currentStep === totalSteps
              ? "pointer-events-none !opacity-0"
              : "opacity-100",
          )}
        >
          <span className="font-montserratAlt text-sm font-black opacity-50">
            {currentStep} / {totalSteps}
          </span>
        </div>
      </div>
      <div
        className={clsx(
          "relative h-1 w-full rounded-full bg-white-default/25 transition-opacity duration-500",
          currentStep === totalSteps
            ? "pointer-events-none !opacity-0"
            : "opacity-100",
        )}
      >
        <div
          className="absolute left-0 h-1 rounded-full bg-purple-default transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </header>
  )
}

export default OnboardingHeader
