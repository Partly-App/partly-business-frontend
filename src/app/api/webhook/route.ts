import { Database } from "@/types/supabase"
import {
  Environment,
  EventName,
  Paddle,
  TransactionCompletedEvent,
  TransactionPaidEvent,
} from "@paddle/paddle-node-sdk"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const paddle = new Paddle(process.env.PADDLE_SECRET_TOKEN!, {
  environment: Environment.sandbox,
})

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const handleTransactionUpdate = async (
  eventData: TransactionCompletedEvent | TransactionPaidEvent,
) => {
  const { customerId, items, subscriptionId, billingPeriod } = eventData.data

  const { data, error } = await supabase
    .from("companies")
    .select("id")
    .eq("paddleCustomerId", customerId!)
    .single()

  if (!data || error) {
    console.error("Error getting company id in transaction event: ", error)
    throw new Error("Error Error getting company id in transaction event")
  }

  const { error: companySubError } = await supabase
    .from("companySubscriptions")
    .upsert(
      {
        companyId: data?.id,
        paddleCustomerId: customerId,
        paddleSubscriptionId: subscriptionId,
        periodStart: billingPeriod?.startsAt,
        periodEnd: billingPeriod?.endsAt,
        status: items[0].price?.status,
      } as Omit<
        Database["public"]["Tables"]["companySubscriptions"]["Row"],
        "companyId"
      > & { companyId: string },
      { onConflict: "companyId" },
    )

  if (companySubError) {
    console.error(
      "Error inserting company subscription in webhook: ",
      companySubError,
    )
  }
}

export async function POST(req: Request) {
  const signature = (req.headers.get("paddle-signature") as string) || ""
  const rawRequestBody = (await req.text()) || ""
  const secretKey = process.env.SUBSCRIPTION_WEBHOOK_SECRET_KEY || ""

  try {
    if (signature && rawRequestBody) {
      // The `unmarshal` function will validate the integrity of the webhook and return an entity
      const eventData = await paddle.webhooks.unmarshal(
        rawRequestBody,
        secretKey,
        signature,
      )

      switch (eventData.eventType) {
        case EventName.SubscriptionTrialing: {
          console.log(`Subscription ${eventData.data.id} started trial`)
          const { customerId, status, currentBillingPeriod, id } =
            eventData.data

          const { error: companySubError } = await supabase
            .from("companySubscriptions")
            .update({
              status: status,
              paddleSubscriptionId: id,
              periodStart: currentBillingPeriod?.startsAt,
              periodEnd: currentBillingPeriod?.endsAt,
            } as Omit<
              Database["public"]["Tables"]["companySubscriptions"]["Row"],
              "companyId"
            > & { companyId: string })
            .eq("paddleCustomerId", customerId)

          if (companySubError) {
            console.error(
              "Error updating subscription status on activation: ",
              companySubError,
            )
          }
          break
        }
        case EventName.SubscriptionActivated: {
          console.log(`Subscription ${eventData.data.id} was activated`)
          const { customerId, status, currentBillingPeriod } = eventData.data

          const { error: companySubError } = await supabase
            .from("companySubscriptions")
            .update({
              status: status,
              periodStart: currentBillingPeriod?.startsAt,
              periodEnd: currentBillingPeriod?.endsAt,
            } as Omit<
              Database["public"]["Tables"]["companySubscriptions"]["Row"],
              "companyId"
            > & { companyId: string })
            .eq("paddleCustomerId", customerId)

          if (companySubError) {
            console.error(
              "Error updating subscription status on activation: ",
              companySubError,
            )
          }
          break
        }
        case EventName.SubscriptionCanceled:
          console.log(`Subscription ${eventData.data.id} was canceled`)

          const { customerId, status, currentBillingPeriod } = eventData.data

          const { error: companySubError } = await supabase
            .from("companySubscriptions")
            .update({
              status: status,
              periodStart: currentBillingPeriod?.startsAt,
              periodEnd: currentBillingPeriod?.endsAt,
            } as Omit<
              Database["public"]["Tables"]["companySubscriptions"]["Row"],
              "companyId"
            > & { companyId: string })
            .eq("paddleCustomerId", customerId)

          if (companySubError) {
            console.error(
              "Error updating subscription status on cancel: ",
              companySubError,
            )
          }
          break

        case EventName.SubscriptionUpdated: {
          console.log(`Subscription ${eventData.data.id} was updated`)

          const { customerId, status, currentBillingPeriod, id } =
            eventData.data

          const { error: companySubError } = await supabase
            .from("companySubscriptions")
            .update({
              status: status,
              paddleSubscriptionId: id,
              periodStart: currentBillingPeriod?.startsAt,
              periodEnd: currentBillingPeriod?.endsAt,
            } as Omit<
              Database["public"]["Tables"]["companySubscriptions"]["Row"],
              "companyId"
            > & { companyId: string })
            .eq("paddleCustomerId", customerId)

          if (companySubError) {
            console.error(
              "Error updating subscription status on update: ",
              companySubError,
            )
          }
          break
        }
        case EventName.TransactionPaid: {
          console.log(`Transaction ${eventData.data.id} was paid`)

          try {
            await handleTransactionUpdate(eventData)
          } catch (err) {
            break
          }
          break
        }
        case EventName.TransactionCompleted: {
          console.log(`Transaction ${eventData.data.id} was completed`)

          try {
            await handleTransactionUpdate(eventData)
          } catch (err) {
            break
          }
          break
        }
        case EventName.TransactionPaymentFailed: {
          console.log(`Transaction ${eventData.data.id} payment failed`)

          // todo: finish
        }
        default:
          console.log(eventData.eventType)
      }
    } else {
      console.log("Signature missing in header")
    }
  } catch (e) {
    // Handle signature mismatch or other runtime errors
    console.log(e)
  }

  // Return a response to acknowledge
  return NextResponse.json({ ok: true })
}
