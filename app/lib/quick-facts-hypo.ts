import { Zap, Brain, Pill, Thermometer, Scale, Heart, Clock, Moon } from 'lucide-react'

export interface QuickFact {
  icon: typeof Zap;
  text: string;
}

export const hypothyroidismQuickFacts: QuickFact[] = [
  { icon: Zap, text: "Hypothyroidism can slow down metabolism" },
  { icon: Brain, text: "Thyroid hormones are crucial for brain development" },
  { icon: Pill, text: "Iodine is essential for thyroid hormone production" },
  { icon: Thermometer, text: "People with hypothyroidism often feel cold" },
  { icon: Scale, text: "Unexplained weight gain can be a sign of hypothyroidism" },
  { icon: Heart, text: "Hypothyroidism can affect heart function" },
  { icon: Clock, text: "Fatigue is a common symptom of hypothyroidism" },
  { icon: Moon, text: "Hypothyroidism can disrupt sleep patterns" }
]

