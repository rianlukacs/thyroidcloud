import { Zap, Brain, Pill, Thermometer, Scale, Heart, Clock, Droplets } from 'lucide-react'

export interface QuickFact {
  icon: typeof Zap;
  text: string;
}

export const hyperthyroidismQuickFacts: QuickFact[] = [
  { icon: Zap, text: "Hyperthyroidism can speed up metabolism" },
  { icon: Brain, text: "Excess thyroid hormones can cause anxiety and irritability" },
  { icon: Pill, text: "Antithyroid medications can help manage hyperthyroidism" },
  { icon: Thermometer, text: "People with hyperthyroidism often feel hot and have increased sweating" },
  { icon: Scale, text: "Unexplained weight loss can be a sign of hyperthyroidism" },
  { icon: Heart, text: "Hyperthyroidism can cause rapid or irregular heartbeat" },
  { icon: Clock, text: "Insomnia and difficulty sleeping are common in hyperthyroidism" },
  { icon: Droplets, text: "Increased thirst and frequent urination may occur in hyperthyroidism" }
]

