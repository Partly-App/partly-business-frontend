import { Environment, Paddle } from "@paddle/paddle-node-sdk"
import { NextResponse } from "next/server"

const paddle = new Paddle(process.env.PADDLE_SANDBOX_API_KEY!, {
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environment,
})

export async function POST(req: Request) {
  const body = await req.json()

  const data = await paddle.customerPortalSessions.create(
    body.customerId,
    body.subscriptionIds,
  )

  return NextResponse.json(data)
}
