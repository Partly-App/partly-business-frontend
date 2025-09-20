import { NextRequest, NextResponse } from "next/server"

const paddleUrl = "https://api.paddle.com/prices"

export async function GET() {
  const res = await fetch(paddleUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.text()
    console.error(error)
    return NextResponse.json({ error }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const res = await fetch(paddleUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error(error)
    return NextResponse.json({ error }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
