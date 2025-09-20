import { Environment, Paddle } from "@paddle/paddle-node-sdk"
import { NextResponse } from "next/server"

const paddle = new Paddle(process.env.PADDLE_SANDBOX_API_KEY!, {
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environment,
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const txnId = searchParams.get("txnId")

  if (!txnId) {
    return NextResponse.json(
      { error: "Missing txn parameter" },
      { status: 400 },
    )
  }

  const txnData = await paddle.transactions.get(txnId)

  return NextResponse.json(txnData)
}
