export interface Symptom {
  id: string;
  name: string;
  description: string;
  details: {
    overview: string;
    managementTips: string[];
    whenToSeekHelp: string[];
    relatedSymptoms: string[];
  };
}

export const hyperthyroidismSymptoms: Symptom[] = [
  {
    id: "weight-loss",
    name: "Weight Loss",
    description: "Unexpected weight loss despite normal or increased appetite",
    details: {
      overview: "Hyperthyroidism speeds up your metabolism, causing unexpected weight loss even when eating the same amount or more than usual. This occurs because your body is burning energy faster than normal.",
      managementTips: [
        "Eat regular, nutrient-rich meals",
        "Include healthy fats in your diet",
        "Have healthy snacks between meals",
        "Track your weight regularly",
        "Stay hydrated"
      ],
      whenToSeekHelp: [
        "Rapid weight loss (more than 5-10% of body weight)",
        "Loss of appetite",
        "Difficulty keeping weight stable",
        "Unexplained muscle loss"
      ],
      relatedSymptoms: [
        "Increased appetite",
        "Heart palpitations",
        "Anxiety",
        "Heat sensitivity"
      ]
    }
  }
];

