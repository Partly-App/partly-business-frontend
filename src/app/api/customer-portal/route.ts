import { Environment, Paddle } from "@paddle/paddle-node-sdk"
import { NextResponse } from "next/server"

const ENVIRONMENT = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environment
const PADDLE_SANDBOX_API_KEY = process.env.PADDLE_SANDBOX_API_KEY
const PADDLE_API_KEY = process.env.PADDLE_API_KEY

export async function POST(req: Request) {
  try {
    // Check env vars
    if (!ENVIRONMENT) {
      console.error("Missing NEXT_PUBLIC_PADDLE_ENVIRONMENT")
      return NextResponse.json(
        { error: "Missing environment config" },
        { status: 500 },
      )
    }

    let apiKey
    if (ENVIRONMENT === "sandbox") {
      apiKey = PADDLE_SANDBOX_API_KEY
      if (!apiKey) {
        console.error("Missing PADDLE_SANDBOX_API_KEY")
        return NextResponse.json(
          { error: "Missing sandbox API key" },
          { status: 500 },
        )
      }
    } else {
      apiKey = PADDLE_API_KEY
      if (!apiKey) {
        console.error("Missing PADDLE_API_KEY")
        return NextResponse.json(
          { error: "Missing production API key" },
          { status: 500 },
        )
      }
    }

    const paddle = new Paddle(apiKey, { environment: ENVIRONMENT })

    const body = await req.json()

    if (!body.customerId || !body.subscriptionIds) {
      console.error("Missing customerId or subscriptionIds in request body")
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      )
    }

    const data = await paddle.customerPortalSessions.create(
      body.customerId,
      body.subscriptionIds,
    )

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in /api/customer-portal:", error)
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    )
  }
}
