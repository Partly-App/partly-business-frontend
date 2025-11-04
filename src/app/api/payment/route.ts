import { Environment, Paddle } from "@paddle/paddle-node-sdk"
import { NextResponse } from "next/server"

const ENVIRONMENT = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environment

const paddle = new Paddle(
  ENVIRONMENT === "sandbox"
    ? process.env.PADDLE_SANDBOX_API_KEY!
    : process.env.PADDLE_API_KEY!,
  {
    environment: ENVIRONMENT,
  },
)

export async function POST(req: Request) {
  const body = await req.json()
  await paddle.subscriptions.activate
  const txn = await paddle.transactions.create({
    customerId: body.customerId,
    items: [
      {
        quantity: 1,
        price: {
          name: "Monthly Subscription",
          description:
            body.price === 499
              ? "3rd tier"
              : body.price === 599
                ? "2nd tier"
                : "1st tier",
          billingCycle: {
            interval: "month",
            frequency: 1,
          },
          trialPeriod: {
            interval: "day",
            frequency: 10,
          },
          unitPrice: {
            currencyCode: "USD",
            amount: `${body.price}`,
          },
          quantity: {
            maximum: 1,
            minimum: 1,
          },
          productId:
            ENVIRONMENT === "sandbox"
              ? "pro_01k5bhj9zjpc0ggpqwet5sfts3"
              : "pro_01k5efm7csf21bvakw64w29ww8", // business subscription id
        },
      },
    ],
  })

  return NextResponse.json({ txnId: txn.id })
}
