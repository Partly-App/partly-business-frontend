import Button from "@/components/shared/Button"
import clsx from "clsx"
import Image from "next/image"

const ReturnOfInterest = () => {
  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          Invest in Well-Being <br />
          <span className="font-black text-green-default">
            Reap the Returns
          </span>
        </h1>
      </div>

      <div
        className={clsx(
          "aspect-video w-full rounded-2xl bg-grey-dark p-6",
          "flex flex-col items-center justify-end",
        )}
      >
        <div className="relative flex w-full flex-1 animate-appear justify-between overflow-visible opacity-0 [animation-delay:1s]">
          <div className="absolute z-[2] h-[150%] w-full bg-gradient-to-b from-transparent to-grey-dark" />
          <Image
            draggable={false}
            alt=""
            src="/images/icons/arrow-up-1.png"
            width={32}
            height={32}
            className="animate-bounceSlowXS relative -top-8 object-contain"
          />
          <Image
            draggable={false}
            alt=""
            src="/images/icons/arrow-up-2.png"
            width={32}
            height={32}
            className="animate-bounceSlowXS relative object-contain [animation-delay:0.3s]"
          />
          <Image
            draggable={false}
            alt=""
            src="/images/icons/arrow-up-2.png"
            width={32}
            height={32}
            className="animate-bounceSlowXS relative -top-3 object-contain"
          />
          <Image
            draggable={false}
            alt=""
            src="/images/icons/arrow-up-1.png"
            width={32}
            height={32}
            className="animate-bounceSlowXS relative top-4 object-contain [animation-delay:0.6s]"
          />
        </div>
        <div className="flex flex-col items-center relative z-[5]">
          <span className="font-bold opacity-50">of up to</span>
          <span className="font-montserratAlt text-18xl font-black leading-[1] text-green-default">
            800%
          </span>
        </div>
      </div>
      <div className="mt-4 px-2">
        <p className="mb-2 text-center text-sm">
          Improving workplace mental health can yield a return of interest up to
          800% due to higher productivity, fewer sick days and lower staff
          turnover
        </p>
        <span className="block text-center text-sm font-bold opacity-25">
          Department of Health and Social Care of UK
        </span>
      </div>

      <Button size="L" color="purple" className="mt-8 w-full">
        Continue
      </Button>
    </section>
  )
}

export default ReturnOfInterest
