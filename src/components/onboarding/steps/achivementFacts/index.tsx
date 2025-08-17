import { OnboardingStepType } from "../../types"
import AnxietyFact from "./AnxietyFact"
import ConflictFact from "./ConflictFact"
import FeedbackFact from "./FeedbackFact"
import ProductivityFact from "./ProductivityFact"
import TensionFact from "./TensionFact"

const COMPONENTS = {
  anxiety: AnxietyFact,
  conflict: ConflictFact,
  feedback: FeedbackFact,
  productivity: ProductivityFact,
  tension: TensionFact,
  other: ProductivityFact,
}

const AchivementFacts = ({ onNext, data }: OnboardingStepType) => {
  if (!data?.whatToAchieve?.[0]) {
    onNext()
    return
  }

  const FactComponent = COMPONENTS[data.whatToAchieve[0].key]

  return <FactComponent onNext={onNext} />
}

export default AchivementFacts
