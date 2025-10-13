import Footer from "@/components/home/Footer"
import Header from "@/components/home/Header"
import BlackText from "@/components/terms/BlackText"
import DottedRow from "@/components/terms/DottedRow"
import Heading from "@/components/terms/Heading"
import Link from "@/components/terms/Link"

const RefundPolicyPage = () => {
  return (
    <main className="px-8 pt-32">
      <Header />
      <h1 className="mb-8 font-montserratAlt text-8xl font-black opacity-50">
        Refund Policy
      </h1>

      <p className="mb-12">
        Thank you for choosing Partly. We strive to provide a valuable and
        supportive experience for all our users. Please read our refund policy
        carefully before making a purchase.
      </p>

      <Heading>1. Payment Processing</Heading>
      <p className="mb-12">
        All payments for Partly subscriptions are securely processed through our
        payment partner, Paddle. By subscribing to Partly, you agree to
        Paddle&apos;s{" "}
        <Link href="https://www.paddle.com/legal/checkout-buyer-terms">
          Buyer Terms
        </Link>{" "}
        in addition to our own policies.
      </p>

      <Heading>2. Subscription Pricing</Heading>
      <p className="mb-2">
        Partly offers tiered pricing based on the number of users in your
        workplace:
      </p>
      <DottedRow>
        <BlackText>5-20 users</BlackText>: $6.99 per user per month
      </DottedRow>
      <DottedRow>
        <BlackText>21-50 users</BlackText>: $5.99 per user per month
      </DottedRow>
      <DottedRow>
        <BlackText>51+ users</BlackText>: $4.99 per user per month
      </DottedRow>
      <p className="mb-12">
        Your subscription fee is calculated based on the total number of users
        in your workplace at the time of billing.
      </p>

      <Heading>3. Refund Eligibility</Heading>
      <DottedRow>
        <BlackText>Initial Purchase:</BlackText> If you are not satisfied with
        your purchase, you may request a refund within{" "}
        <BlackText>14 days</BlackText> of your initial subscription payment. To
        request a refund, please contact our support team at{" "}
        <Link href="mailto:support@partly.life">support@partly.life</Link>
      </DottedRow>
      <DottedRow>
        <BlackText>Renewals:</BlackText> Refunds are not available for
        subscription renewals. Please ensure you manage your subscription and
        user count before your renewal date.
      </DottedRow>
      <DottedRow className="!mb-12">
        <BlackText>One-Time Payments for Added Users:</BlackText> When
        additional users are added to your workplace, a one-time payment is
        required for the new users according to the current pricing tier. These
        one-time payments are non-refundable.
      </DottedRow>

      <Heading>4. Changes in User Count</Heading>
      <DottedRow>
        <BlackText>Reducing Users:</BlackText> If you decrease the number of
        users in your workplace, no refunds or credits will be issued for the
        unused portion of your subscription. Your next billing cycle will
        reflect the updated user count and applicable pricing tier.
      </DottedRow>
      <DottedRow className="!mb-12">
        <BlackText>Adding Users:</BlackText> If you increase the number of
        users, you will be required to make a one-time payment for the
        additional users based on the current pricing tier. This payment is
        non-refundable. Future subscription renewals will include the full price
        for all active users.
      </DottedRow>

      <Heading>5. How to Request a Refund</Heading>
      <p className="mb-12">
        To request a refund within the eligible period, please contact us at
        <Link href="mailto:support@partly.life">support@partly.life</Link> with
        your account details and reason for the request. Refunds will be
        processed through Paddle and may take several business days to appear on
        your statement.
      </p>

      <Heading>6. Exceptions</Heading>
      <p className="mb-12">
        We reserve the right to refuse a refund if we determine that there has
        been abuse of our refund policy or if significant usage of the service
        has occurred during the refund period.
      </p>

      <Heading>7. Contact Us</Heading>
      <p className="mb-12">
        If you have any questions about this policy, please contact us at
        <Link href="mailto:support@partly.life">support@partly.life</Link>
      </p>

      <p className="mb-2">
        <BlackText>Last Updated</BlackText>: October 12, 2025
      </p>

      <Footer />
    </main>
  )
}

export default RefundPolicyPage
