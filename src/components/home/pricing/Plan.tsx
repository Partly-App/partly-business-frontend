import clsx from "clsx"
import Image from "next/image"
import { ReactNode } from "react"

type PlanProps = {
  name: string
  numberOfSeats: string | ReactNode
  price: string
  isMostPopular?: boolean
}

const Plan = ({ name, numberOfSeats, price, isMostPopular }: PlanProps) => {
  return (
    <div
      className={clsx(
        "relative rounded-xl p-4",
        isMostPopular ? "bg-purple-light" : "bg-grey-dark",
      )}
    >
      {isMostPopular && (
        <div
          className={clsx(
            "absolute -top-3 right-4 flex items-center gap-2",
            "rounded-md bg-red-light px-2 py-1",
          )}
        >
          <Image src="/images/icons/fire.svg" height={16} width={16} alt="" />
          <span className="font-montserratAlt text-xs font-black leading-none text-black-default">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-10 flex flex-col gap-2">
        <span
          className={clsx(
            "font-montserratAlt text-xl font-black",
            isMostPopular && "text-black-default",
          )}
        >
          {name}
        </span>
        <div className="flex items-end gap-1.5">
          <span className="text-8xl font-black leading-none text-purple-default">
            {numberOfSeats}
          </span>
          <span
            className={clsx(
              "pb-0.5 text-base font-medium leading-none opacity-50",
              isMostPopular && "text-black-default",
            )}
          >
            seats
          </span>
        </div>
      </div>

      <div className="flex items-end gap-1">
        <span
          className={clsx(
            "text-4xl font-black leading-none",
            isMostPopular && "text-black-default",
          )}
        >
          {price}
        </span>
        <span
          className={clsx(
            "pb-0.5 font-inter text-xs font-medium leading-none opacity-50",
            isMostPopular && "text-black-default",
          )}
        >
          /seat/month
        </span>
      </div>
    </div>
  )
}

export default Plan
