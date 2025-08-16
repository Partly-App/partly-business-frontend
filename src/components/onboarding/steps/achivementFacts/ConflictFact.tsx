import Button from "@/components/shared/Button"
import Image from "next/image"

const ConflictFact = () => {
  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          Improve employee{" "}
          <span className="font-black text-red-default">conflict</span>{" "}
          resolution
        </h1>
      </div>

      <div className="relative mx-auto mb-12 aspect-video w-full">
        <div className="absolute z-[2] h-full w-full bg-gradient-to-t from-black-light to-transparent" />
        <Image
          fill
          alt=""
          draggable={false}
          src="/images/facts/conflict.webp"
          className="rounded-t-2xl object-cover"
        />

        <div className="absolute -bottom-9 left-0 right-0 z-[5] flex flex-col items-center">
          <span className="font-montserratAlt font-bold">over</span>
          <span className="text-center font-montserratAlt text-18xl font-black leading-[1] text-green-default">
            70%
          </span>
        </div>
      </div>
      <p className="text-center font-medium">
        of employees from companies who adopt wellness platforms report{" "}
        <span className="font-montserratAlt font-black text-green-default">
          improved communication and team skills
        </span>
      </p>

      <Button size="L" color="purple" className="mt-10 w-full">
        Continue
      </Button>
    </section>
  )
}

export default ConflictFact
