import { Environment, Paddle } from "@paddle/paddle-node-sdk"
import { NextResponse } from "next/server"

const paddle = new Paddle(process.env.PADDLE_SANDBOX_API_KEY!, {
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environment,
})

export async function POST(req: Request) {
  const body = await req.json()

  const txn = await paddle.transactions.create({
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
          productId: "pro_01k5bhj9zjpc0ggpqwet5sfts3", // business subscription id
        },
      },
    ],
  })

  return NextResponse.json({ txn: txn.id })
}
