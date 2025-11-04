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

  const data = await paddle.customers.create({
    email: body.email,
    name: body.name,
  })

  return NextResponse.json(data)
}
