import Footer from "@/components/home/Footer"
import Header from "@/components/home/Header"
import BlackText from "@/components/terms/BlackText"
import DottedRow from "@/components/terms/DottedRow"
import Heading from "@/components/terms/Heading"
import Link from "@/components/terms/Link"
import { urls } from "@/constants/urls"

const TermsOfUsePage = () => {
  return (
    <main className="px-8 pt-32">
      <Header />
      <h1 className="mb-8 font-montserratAlt text-8xl font-black opacity-50">
        Terms of use
      </h1>

      <Heading>1. Acceptance of Terms</Heading>
      <p className="mb-2">
        By downloading, accessing, or using the Partly app (the “App”), you
        agree to be bound by these Terms of Use (“Terms”) and our{" "}
        <Link href={urls.privacyPolicy}>Privacy Policy</Link>. If you do not
        agree to these Terms, please do not use the App.
      </p>
      <p className="mb-12">
        These Terms govern your use of the App, which provides internal family
        systems (IFS)-based emotional education and AI-powered conversational
        features. We may update these Terms from time to time, and your
        continued use of the App constitutes acceptance of any changes.
      </p>

      <Heading>2. User Eligibility</Heading>
      <p className="mb-2">
        You must be at least 16 years old (or the minimum legal age in your
        jurisdiction) to use the App. By using the App, you represent and
        warrant that you have the legal capacity to enter into this agreement
        and comply with these Terms.
      </p>
      <p className="mb-12">
        If you are under the required age, please do not use the App or provide
        any personal information.
      </p>

      <Heading>3. Account Registration & Security</Heading>
      <p className="mb-2">
        To use features of the App, you are required to create an account and
        provide accurate, current, and complete information. You are responsible
        for maintaining the confidentiality of your login credentials and for
        all activities that occur under your account.
      </p>
      <p className="mb-12">
        To use features of the App, you are required to create an account and
        provide accurate, current, and complete information. You are responsible
        for maintaining the confidentiality of your login credentials and for
        all activities that occur under your account.
      </p>

      <Heading>4. Subscription & Payment Terms</Heading>
      <p className="mb-2">
        The App offers a free trial period followed by paid subscription plans,
        details of which are provided within the App. Subscriptions are billed
        through RevenueCat or other authorized payment processors.
      </p>
      <p className="mb-2">
        By subscribing, you authorize us to charge the applicable fees
        automatically at the beginning of each billing cycle until you cancel.
        Subscriptions auto-renew unless canceled at least 24 hours before the
        end of the current period.
      </p>
      <p className="mb-12">
        You can manage or cancel your subscription through your app store
        account settings. We do not provide refunds for subscription fees after
        the free trial ends, except where required by applicable law.
      </p>

      <Heading>5. App Usage Rules</Heading>
      <p className="mb-2">
        You agree to use the app responsibly and lawfully. You must not:
      </p>
      <DottedRow>Harass, abuse, or harm other users.</DottedRow>
      <DottedRow>
        Use the app to create or share harmful, offensive, or illegal content.
      </DottedRow>
      <DottedRow>
        Attempt to copy, modify, distribute, reverse engineer, or otherwise
        exploit the app or its content.
      </DottedRow>
      <DottedRow className="mb-6">
        Interfere with the app’s operation or security.
      </DottedRow>
      <p className="mb-12">
        We reserve the right to suspend or terminate accounts violating these
        rules.
      </p>

      <Heading>6. Content Ownership & License</Heading>
      <DottedRow>
        All app content, including text, design, software, and intellectual
        property, is owned by us or our licensors.
      </DottedRow>
      <DottedRow>
        You retain ownership of the content you create or submit through the
        app, such as notes, reflections, and messages.
      </DottedRow>
      <DottedRow>
        By submitting user-generated content, you grant us a worldwide,
        royalty-free, non-exclusive license to use, store, and analyze this
        content to operate, improve, and personalize the app and related
        services.
      </DottedRow>
      <DottedRow className="!mb-12">
        This license does not allow us to sell your content or use it outside
        the scope of providing and improving the app.
      </DottedRow>

      <Heading>7. AI Content Disclaimer</Heading>
      <DottedRow>
        App&apos;s content, personalized insights and well-being scores provided
        in the app are for educational purposes only.
      </DottedRow>
      <DottedRow>
        They do not constitute medical, psychological, or professional advice.
      </DottedRow>
      <DottedRow>
        You acknowledge that any decisions or actions you take based on
        AI-generated content are at your own risk.
      </DottedRow>
      <DottedRow className="!mb-12">
        We disclaim any liability for outcomes resulting from your use or
        reliance on the AI content.
      </DottedRow>

      <Heading>8. Privacy</Heading>
      <DottedRow>
        Your use of the app is also governed by our{" "}
        <Link href={urls.privacyPolicy}>Privacy Policy</Link>, which explains
        how we collect, use, and protect your personal data.
      </DottedRow>
      <DottedRow className="!mb-12">
        By using the app, you consent to the practices described in the{" "}
        <Link href={urls.privacyPolicy}>Privacy Policy</Link>.
      </DottedRow>

      <Heading>9. Termination & Suspension</Heading>
      <DottedRow>
        We reserve the right to suspend or terminate your account at any time,
        without prior notice, if you violate these Terms or engage in harmful,
        illegal, or abusive behavior.
      </DottedRow>
      <DottedRow>
        Upon termination, your access to the app and its services will end
        immediately.
      </DottedRow>
      <DottedRow className="!mb-12">
        User data may be deleted or retained in accordance with our{" "}
        <Link href={urls.privacyPolicy}>Privacy Policy</Link> and applicable
        laws.
      </DottedRow>

      <Heading>10. Disclaimers & Limitation of Liability</Heading>
      <DottedRow>
        The app and its services are provided “as is” and “as available” without
        warranties of any kind, express or implied, including but not limited to
        uninterrupted or error-free operation.
      </DottedRow>
      <DottedRow>
        We do not guarantee the accuracy, completeness, or reliability of
        AI-generated content or other materials provided through the app.
      </DottedRow>
      <DottedRow>
        To the fullest extent permitted by law, we disclaim all liability for
        any damages arising from your use or inability to use the app, including
        indirect, incidental, or consequential damages.
      </DottedRow>
      <DottedRow className="!mb-12">
        Your use of the app is at your own risk.
      </DottedRow>

      <Heading>11. Indemnification</Heading>
      <DottedRow className="!mb-12">
        You agree to indemnify, defend, and hold harmless Partly, its
        affiliates, officers, employees, and agents from and against any claims,
        liabilities, damages, losses, or expenses (including legal fees) arising
        out of or related to your violation of these Terms, misuse of the app,
        or infringement of any rights of others.
      </DottedRow>

      <Heading>12. Modifications to Terms</Heading>
      <DottedRow className="!mb-12">
        We reserve the right to update or modify these Terms of Use at any time.
        When changes are made, we will notify you by updating the “Last Updated”
        date at the bottom of these terms and, where appropriate, through in-app
        notifications or by email. Your continued use of the app after such
        notification constitutes your acceptance of the updated terms.
      </DottedRow>

      <Heading>13. Governing Law & Dispute Resolution</Heading>
      <DottedRow className="!mb-12">
        These Terms of Use are governed by and construed in accordance with the
        laws of Ukraine. Any disputes arising from or relating to these terms or
        your use of the app shall be resolved primarily through good-faith
        negotiations. If unresolved, disputes may be submitted to the competent
        courts located in Ukraine.
      </DottedRow>

      <Heading>14. Contact Information</Heading>
      <p className="mb-2">
        If you have any questions, concerns, or requests regarding these Terms
        of Use or the app, please contact us at:
      </p>
      <p className="mb-2">
        Email:{" "}
        <Link href="mailto:support@partly.life">support@partly.life</Link>
      </p>
      <p className="mb-12">We strive to respond promptly and helpfully.</p>
      <p className="mb-12">
        “Partly” is owned and operated by Davyd Haidamaka, a sole proprietor,
        with principal place of business in Kyiv, Ukraine.
      </p>

      <p className="mb-2">
        <BlackText>Last Updated</BlackText>: October 12, 2025
      </p>
      <Footer />
    </main>
  )
}

export default TermsOfUsePage
