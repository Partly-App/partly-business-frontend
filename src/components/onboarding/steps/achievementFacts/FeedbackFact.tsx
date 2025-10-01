import Button from "@/components/shared/Button"
import Image from "next/image"
import { OnboardingStepType } from "../../types"

const FeedbackFact = ({ onNext }: OnboardingStepType) => {
  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          Let your team learn about{" "}
          <span className="font-black text-blue-default">feedback</span> with{" "}
          <span
            className="font-black text-yellow-light"
            style={{ textShadow: "0px 0px 2px #FFF7DF" }}
          >
            Partly
          </span>
        </h1>
      </div>

      <div className="relative mx-auto mb-12 aspect-video w-full">
        <div className="absolute z-[2] h-full w-full bg-gradient-to-t from-black-light to-transparent" />
        <Image
          fill
          alt=""
          draggable={false}
          src="/images/facts/feedback.webp"
          className="rounded-t-2xl object-cover"
        />

        <div className="absolute -bottom-9 left-0 right-0 z-[5] flex flex-col items-center">
          <span className="text-center font-montserratAlt text-18xl font-black leading-[1] text-green-default">
            75%
          </span>
        </div>
      </div>
      <p className="text-center font-medium">
        of employees report feeling supported when companies{" "}
        <span className="font-montserratAlt font-black text-blue-default">
          track mental-health metrics
        </span>{" "}
        and create feedback-rich cultures
      </p>

      <Button
        size="L"
        color="purple"
        className="mt-10 w-full"
        onClick={() => onNext()}
      >
        Continue
      </Button>
    </section>
  )
}

export default FeedbackFact
