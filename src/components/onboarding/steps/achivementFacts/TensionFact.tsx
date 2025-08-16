import Button from "@/components/shared/Button"
import clsx from "clsx"
import Image from "next/image"

const TensionFact = () => {
  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          Reduce workplace tension with{" "}
          <span className="font-black text-yellow-default">
            personalized learning
          </span>
        </h1>
      </div>

      <div className="relative mx-auto mb-8 aspect-video w-full">
        <div className="absolute z-[2] h-full w-full bg-gradient-to-t from-black-light to-transparent" />
        <Image
          fill
          alt=""
          draggable={false}
          src="/images/facts/tension.jpg"
          className="rounded-t-2xl object-cover"
        />
        <span
          className={clsx(
            "absolute -bottom-9 left-0 right-0 z-[5] text-center",
            "font-montserratAlt text-18xl font-black text-green-default",
          )}
        >
          78%
        </span>
      </div>
      <p className="text-center font-medium">
        of employees feel more{" "}
        <span className="font-montserratAlt font-black text-yellow-default">
          connected
        </span>{" "}
        and{" "}
        <span className="font-montserratAlt font-black text-yellow-default">
          supported
        </span>{" "}
        in workplaces with proactive mental health programs
      </p>

      <Button size="L" color="purple" className="mt-10 w-full">
        Continue
      </Button>
    </section>
  )
}

export default TensionFact
