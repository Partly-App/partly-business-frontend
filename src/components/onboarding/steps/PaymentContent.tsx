"use client"

import Button from "@/components/shared/Button"
import Bell from "@/components/shared/icons/Bell"
import Star from "@/components/shared/icons/Star"
import Unlocked from "@/components/shared/icons/Unlocked"
import OverlayLoader from "@/components/shared/loaders/OverlayLoader"
import { MAX, MIN } from "@/constants/employee"
import {
  FIRST_TIER_DISCOUNT,
  FIRST_TIER_PRICE,
  SECOND_TIER_DISCOUNT,
  SECOND_TIER_PRICE,
  THIRD_TIER_DISCOUNT,
  THIRD_TIER_PRICE,
} from "@/constants/pricing"
import { useToast } from "@/context/ToastContext"
import { Environments, Paddle, initializePaddle } from "@paddle/paddle-js"
import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"
import { Check, Info, Minus, Plus, Shield } from "react-feather"

const PaymentContent = ({
  count: initialCount,
  companyId,
}: {
  count: number
  companyId: string
}) => {
  const [paddle, setPaddle] = useState<Paddle>()
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)

  const { showToast } = useToast()

  const currentPricing = useMemo(() => {
    let price
    let discount

    if (count <= 20) {
      price = FIRST_TIER_PRICE
      discount = FIRST_TIER_DISCOUNT
    } else if (count <= 50) {
      price = SECOND_TIER_PRICE
      discount = SECOND_TIER_DISCOUNT
    } else {
      price = THIRD_TIER_PRICE
      discount = THIRD_TIER_DISCOUNT
    }

    return {
      price,
      discount,
    }
  }, [count])

  const handleCheckout = async () => {
    if (!paddle) return

    setIsLoading(true)

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({ price: currentPricing.price * count }),
      })
      const data = await res.json()

      if (!data) {
        throw new Error("Error creating new price")
      }

      paddle.Checkout.open({
        transactionId: data.txn,
        settings: {
          displayMode: "overlay",
          variant: "one-page",
          theme: "dark",
          successUrl: `${window.location.origin}/onboarding/success?txnId=${data.txn}&companyId=${companyId}`,
          showAddDiscounts: false,
        },
      })

      setIsLoading(false)
    } catch (err) {
      console.error(err)
      showToast("Unexpected error. Please try again", "bottom", "error")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    initializePaddle({
      environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environments,
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,
    }).then((p) => {
      setPaddle(p)
    })
  }, [])

  return (
    <>
      <OverlayLoader isLoading={isLoading} />

      <section className="mx-auto max-w-lg px-6 pb-10 pt-5">
        <div className="mb-6 flex flex-col items-center">
          <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
            Start your monthly plan <br />
            with a{" "}
            <span className="font-montserratAlt font-black text-purple-default">
              10-day free trial
            </span>
          </h1>
        </div>

        <div className="rounded-xl bg-grey-dark p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Button
                containsIconOnly
                disabled={count === MIN}
                size="XS"
                color="white"
                onClick={() =>
                  setCount((prev) => (prev !== MIN ? prev - 1 : prev))
                }
              >
                <Minus size={14} color="black" />
              </Button>
              <p className="w-6 text-center font-montserratAlt text-xl font-black">
                {count}
              </p>
              <Button
                containsIconOnly
                disabled={count === MAX}
                size="XS"
                color="white"
                onClick={() =>
                  setCount((prev) => (prev !== MAX ? prev + 1 : prev))
                }
              >
                <Plus size={14} color="black" />
              </Button>
            </div>

            <div className="flex flex-col gap-1 text-right">
              <span className="text-sm opacity-50">
                ${currentPricing.price * 0.01} x {count} seats
              </span>
              <span className="font-montserratAlt font-black">
                ${(currentPricing.price * 0.01 * count).toFixed(2)}
                <span className="text-xs opacity-50"> + VAT</span> / month
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-6">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <Check size={24} className="text-purple-default" />
                <span>Business discount applied</span>
              </div>

              <div
                className={clsx(
                  "rounded-md bg-green-light px-2 py-1.5 font-black text-black-default",
                  "text-center font-montserratAlt text-sm leading-none",
                )}
              >
                {currentPricing.discount}% OFF
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Check size={24} className="text-purple-default" />
              <span>
                <span className="font-montserratAlt font-black">Free</span>{" "}
                employee analytics
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Check size={24} className="text-purple-default" />
              <span>
                <span className="font-montserratAlt font-black">10-day</span>{" "}
                free trial
              </span>
            </div>
          </div>

          <div className="flex flex-col px-8 pt-8">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-purple-light">
                  <Unlocked size={20} className="text-purple-light" />
                </div>
                <div className="flex flex-col gap-2 py-2 pl-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">
                  Today, 10-day free team access
                </span>
                <span className="text-xs opacity-50">
                  Start your well-being journey <br />
                  with our app
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-yellow-light">
                  <Bell size={20} className="text-yellow-light" />
                </div>
                <div className="flex flex-col gap-2 py-2 pl-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-light" />
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-light" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">
                  18 Aug 2025
                </span>
                <span className="text-xs opacity-50">
                  Get a reminder when your <br />
                  trial ends
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-yellow-light">
                <Star size={20} className="text-yellow-light" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">
                  18 Aug 2025
                </span>
                <span className="text-xs opacity-50">
                  Your monthly subscription starts <br />
                  at{" "}
                  <span className="font-bold">
                    ${(currentPricing.price * 0.01 * count).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between pt-8 font-montserratAlt text-xl font-black">
            <span>Today's charge</span>

            <span>$0</span>
          </div>
          <Button
            size="M"
            color="purple"
            containerClassName="w-full"
            onClick={handleCheckout}
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold">Continue</span>
              <span className="text-xs opacity-50">With 10-day trial</span>
            </div>
          </Button>

          <div className="flex items-center justify-center gap-3 pt-6">
            <div className="flex items-center gap-2 rounded-md bg-green-light/25 px-2 py-1.5">
              <Shield size={16} className="text-green-default" />
              <span className="text-xs text-green-default">
                Pay safe & secure
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-md bg-blue-light/25 px-2 py-1.5">
              <Info size={16} className="text-blue-light" />
              <span className="text-xs text-blue-light">Cancel anytime</span>
            </div>
          </div>

          <p className="px-3 py-4 text-center text-[10px] text-grey-default">
            By clicking 'Continue' button, you agree that today you start your{" "}
            <span className="font-black">10-day free trial</span>. After your
            trial ends,{" "}
            <span className="font-black">
              ${(currentPricing.price * 0.01 * count).toFixed(2)}
            </span>{" "}
            will be charged for the monthly subscription plan. To cancel, please
            visit your business account on our website.
          </p>
        </div>
      </section>
    </>
  )
}

export default PaymentContent
