import Header from "@/components/home/Header"
import BlackText from "@/components/terms/BlackText"
import DottedRow from "@/components/terms/DottedRow"
import Heading from "@/components/terms/Heading"
import Link from "@/components/terms/Link"

const PrivacyPolicyPage = () => {
  return (
    <main className="px-8 pt-32">
      <Header />
      <h1 className="mb-8 font-montserratAlt text-8xl font-black opacity-50">
        Privacy Policy
      </h1>

      <Heading>1. Introduction</Heading>
      <p className="mb-2">
        Welcome to Partly - an educational app designed to help you better
        understand yourself through guided emotional reflection and Internal
        Family Systems (IFS)-based practices. In place of traditional lessons,
        our app guides users through <BlackText>“moments”</BlackText>, each made
        up of smaller interactive **“steps”** designed to support emotional
        reflection and learning. Your privacy is important to us.
      </p>
      <p className="mb-2">
        This Privacy Policy explains how we collect, use, store, and protect the
        personal information you provide when using our app. It also outlines
        your rights and choices regarding your data.
      </p>
      <p className="mb-12">
        By accessing or using Partly, you agree to the collection and use of
        your information in accordance with this Privacy Policy. If you do not
        agree with any part of this policy, please do not use the app.
      </p>

      <Heading>2. Information We Collect</Heading>
      <p className="mb-6">
        We collect various types of information to provide and improve your
        experience with the app. This includes:
      </p>
      <Heading size="S">a. Personal Information</Heading>

      <DottedRow>
        We collect various types of information to provide and improve your
        experience with the app. This includes:
      </DottedRow>

      <DottedRow>
        <BlackText>Email address</BlackText> - collected through Supabase Auth
        for account creation and login.
      </DottedRow>
      <DottedRow className="!mb-6">
        <BlackText>Subscription data</BlackText> - including plan type, payment
        status, and transaction history, provided via RevenueCat.
      </DottedRow>

      <Heading size="S">b. User-Generated Content</Heading>
      <DottedRow>
        Content you create and interact with in the app, such as:
      </DottedRow>
      <DottedRow doublePadding>Reflections and personal notes</DottedRow>
      <DottedRow doublePadding>Answers to questions in steps</DottedRow>
      <DottedRow doublePadding>Feedback submitted through the app</DottedRow>
      <DottedRow doublePadding className="!mb-6">
        Personalized insights obtained at the end of moments
      </DottedRow>

      <Heading size="S">c. AI-Related Data</Heading>
      <DottedRow>
        When you interact with our AI features (e.g., personalized insights),
        the following types of information may be sent to OpenAI:
      </DottedRow>
      <DottedRow doublePadding className="!mb-6">
        Your answers to questions, insights, reflections, and notes
      </DottedRow>
      <DottedRow className="!mb-12">
        This data is used to generate personalized responses. It is processed
        securely through OpenAI&apos;s API and is not used to train their
        models, in accordance with OpenAI&apos;s API usage policy.
      </DottedRow>

      <Heading>3. How We Use the Information</Heading>
      <p className="mb-6">
        We use the information we collect for the following purposes:
      </p>
      <DottedRow>
        To personalize your experience: This includes generating daily notes
        from “Self”, personalized insights at the end of moments based on your
        reflections, messages, and activity.
      </DottedRow>
      <DottedRow>
        To provide emotional guidance: Your answers, notes, and interactions
        help us offer relevant and supportive insights rooted in emotional
        intelligence education.
      </DottedRow>
      <DottedRow>
        To operate and improve the app: We analyze usage patterns and
        performance data to enhance features, content, and the overall user
        experience.
      </DottedRow>
      <DottedRow>
        To manage subscriptions and payments: We process subscription data
        through RevenueCat to enable billing, free trials, and access to premium
        features.
      </DottedRow>
      <DottedRow className="!mb-6">
        To communicate with you: We may use your contact information to respond
        to support requests, send important updates, or share relevant
        product-related information.
      </DottedRow>
      <p className="mb-12">
        We do not sell your personal data or use it for third-party advertising.
      </p>

      <Heading>4. How We Share Your Information</Heading>
      <p className="mb-6">
        We only share your information with trusted third-party services that
        are essential to the operation of the app:
      </p>
      <DottedRow>
        <BlackText>OpenAI</BlackText>: We share relevant data (such as
        reflections, insights) with OpenAI to generate personalized insights,
        daily notes from “Self” and responses in the Dialogue feature. This data
        is processed securely via their API and is not used to train OpenAI
        models.
      </DottedRow>
      <DottedRow>
        <BlackText>RevenueCat</BlackText>: Used to manage in-app purchases,
        subscriptions, billing history, and free trial status.
      </DottedRow>
      <DottedRow className="!mb-6">
        <BlackText>Supabase</BlackText>: Our backend service that stores and
        manages your data securely, including your account, notes, reflections,
        and chat history.
      </DottedRow>
      <p className="mb-12">
        We do not sell or rent your personal data to any third parties. Data
        sharing is limited strictly to what is necessary for the app to function
        and improve.
      </p>

      <Heading>5. Data Retention</Heading>
      <p className="mb-6">
        We retain your data only as long as necessary to provide our services,
        support your experience, and comply with legal obligations.
      </p>
      <DottedRow>
        If you choose to delete your account, your personal data - including
        insights, reflections, notes, messages, and activity history - will be
        permanently and immediately deleted from our main database.
      </DottedRow>
      <DottedRow>
        Some data may be retained in secure backups for up to 30 days for
        recovery and legal compliance purposes, after which it is automatically
        purged.
      </DottedRow>
      <DottedRow className="!mb-6">
        You may request deletion of your account and associated data at any time
        from within the app.
      </DottedRow>
      <p className="mb-12">Once deleted, your data cannot be recovered.</p>

      <Heading>6. Data Security</Heading>
      <p className="mb-6">
        We take your privacy and data security seriously. To protect your
        personal information, we implement industry-standard security measures,
        including:
      </p>
      <DottedRow>
        Access controls and authentication to restrict access to authorized
        personnel only.
      </DottedRow>
      <DottedRow className="!mb-6">
        Secure APIs and infrastructure provided by trusted third-party services
        like Supabase, OpenAI, and RevenueCat.
      </DottedRow>
      <p className="mb-12">
        However, please note that no method of electronic transmission or
        storage is completely secure. While we do our best to safeguard your
        data, we cannot guarantee absolute security. Use of the app implies
        understanding and acceptance of this risk.
      </p>

      <Heading>7. User Rights</Heading>
      <p className="mb-6">
        You have control over your personal information. As a user, you have the
        following rights:
      </p>
      <DottedRow>
        <BlackText>Access and Update</BlackText>: You can view and edit your
        personal data, reflections, and notes directly within the app.
      </DottedRow>
      <DottedRow>
        <BlackText>Deletion</BlackText>: You may permanently delete your account
        and all associated data through the app settings. This includes all
        reflections, notes, messages, and personal insights.
      </DottedRow>
      <DottedRow className="!mb-6">
        <BlackText>Object to Processing</BlackText>: You may object to how your
        data is being used for specific purposes (e.g., analytics or
        personalization) by reaching out to our support team.
      </DottedRow>
      <p className="mb-12">
        To exercise any of these rights, please use the in-app settings or
        contact us at{" "}
        <Link href="mailto:support@partly.life">support@partly.life</Link>. We
        will respond to requests in accordance with applicable data protection
        laws.
      </p>

      <Heading>8. Children&apos;s Privacy</Heading>
      <p className="mb-2">
        Our app is intended for users who are at least 16 years old. We do not
        knowingly collect or solicit personal information from anyone under the
        age of 16. If you are under 16, please do not use the app or provide any
        information to us.
      </p>
      <p className="mb-12">
        If we learn that we have collected personal data from a child under the
        required age without verified parental consent, we will take steps to
        delete that information promptly. If you believe that a child under 16
        may have provided us with personal information, please contact us at
        <Link href="mailto:support@partly.life">support@partly.life</Link>.
      </p>

      <Heading>9. Third-Party Links & Services</Heading>
      <p className="mb-2">
        Our app may contain links to external websites or services, such as
        support pages or app store listings. We are not responsible for the
        privacy practices or content of these third-party sites.
      </p>
      <p className="mb-6">
        Additionally, we use third-party services to operate core features of
        the app, including:
      </p>

      <DottedRow>
        <BlackText>Supabase</BlackText> (authentication, database, and storage)
      </DottedRow>
      <DottedRow>
        <BlackText>OpenAI</BlackText>: (for generating personalized insights,
        well-being scores and daily notes from “Self”)
      </DottedRow>
      <DottedRow className="!mb-6">
        <BlackText>RevenueCat</BlackText>: (for managing subscriptions and
        payments)
      </DottedRow>

      <p className="mb-6">
        These services may collect and process your data according to their own
        privacy policies. We encourage you to review their respective privacy
        policies to understand how your data is handled:
      </p>

      <DottedRow>
        <Link href="https://supabase.com/privacy">Supabase Privacy Policy</Link>
      </DottedRow>
      <DottedRow>
        <Link href="https://openai.com/policies/row-privacy-policy/">
          OpenAI Privacy Policy
        </Link>
      </DottedRow>
      <DottedRow className="!mb-6">
        <Link href="https://www.revenuecat.com/privacy/">
          RevenueCat Privacy Policy
        </Link>
      </DottedRow>

      <p className="mb-12">
        We do not control how these third parties collect, use, or secure your
        data and are not responsible for their practices.
      </p>

      <Heading>10. International Data Transfers</Heading>
      <p className="mb-2">
        If you are accessing the app from outside the country where our servers
        or third-party service providers (such as Supabase, OpenAI, and
        RevenueCat) are located, please note that your information may be
        transferred to, stored, and processed in countries outside of your own -
        including the United States.
      </p>
      <p className="mb-2">
        By using the app, you consent to this transfer of information. We take
        steps to ensure that your data is treated securely and in accordance
        with this Privacy Policy, regardless of where it is processed.
      </p>
      <p className="mb-12">
        For users in the European Union (EU) or United Kingdom (UK), we rely on
        appropriate safeguards such as Standard Contractual Clauses (SCCs) or
        equivalent legal mechanisms, where required, to ensure your data is
        protected when transferred internationally.
      </p>

      <Heading>10. International Data Transfers</Heading>
      <p className="mb-2">
        We may update this Privacy Policy from time to time to reflect changes
        in our practices, technologies, legal requirements, or for other
        operational reasons. When we make material changes, we will notify you
        by updating the “Last Updated” date at the bottom of this policy and,
        where appropriate, through in-app notifications or by email.
      </p>
      <p className="mb-12">
        We encourage you to review this policy periodically to stay informed
        about how we protect your information.
      </p>

      <Heading>12. Contact Information</Heading>
      <p className="mb-2">
        If you have any questions, concerns, or requests regarding this Privacy
        Policy or how your data is handled, please contact us at:
      </p>
      <p className="mb-2">
        Email:{" "}
        <Link href="mailto:support@partly.life">support@partly.life</Link>
      </p>
      <p className="mb-12">
        We’re committed to addressing your privacy concerns promptly and
        transparently.
      </p>

      <p className="mb-2">
        <BlackText>Last Updated</BlackText>: October 12, 2025
      </p>
    </main>
  )
}

export default PrivacyPolicyPage
