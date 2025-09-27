import Benefits from "./Benefits"
import ContactForm from "./ContactForm"
import Footer from "./Footer"
import Header from "./Header"
import HeroSection from "./HeroSection"
import Features from "./features/Features"
import PricingSection from "./pricing/PricingSection"
import SctructureShowcase from "./structureShowcase"
import Testimonials from "./testimonials"

const HomePageContent = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <Features />
      <SctructureShowcase />
      <Benefits />
      <PricingSection />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  )
}

export default HomePageContent
