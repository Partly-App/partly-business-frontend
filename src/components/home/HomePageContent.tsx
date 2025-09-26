import Benefits from "./Benefits"
import Header from "./Header"
import HeroSection from "./HeroSection"
import Features from "./features/Features"
import SctructureShowcase from "./structureShowcase"

const HomePageContent = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <Features />
      <SctructureShowcase />
      <Benefits />
    </main>
  )
}

export default HomePageContent
