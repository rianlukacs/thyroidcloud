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

export const hypothyroidismSymptoms: Symptom[] = [
  {
    id: "fatigue",
    name: "Fatigue",
    description: "Feeling tired, sluggish, or weak",
    details: {
      overview: "Hypothyroid fatigue is more than just feeling tired. It's a persistent exhaustion that doesn't improve with rest. This happens because your thyroid isn't producing enough hormones to properly regulate your body's energy production.",
      managementTips: [
        "Maintain a consistent sleep schedule",
        "Take short rest periods throughout the day",
        "Engage in gentle exercise like walking or yoga",
        "Stay hydrated and maintain a balanced diet",
        "Practice stress management techniques"
      ],
      whenToSeekHelp: [
        "Fatigue interferes with daily activities",
        "You're getting adequate sleep but still feel exhausted",
        "Fatigue is accompanied by other symptoms",
        "You experience sudden onset of severe fatigue"
      ],
      relatedSymptoms: [
        "Muscle weakness",
        "Brain fog",
        "Depression",
        "Cold sensitivity"
      ]
    }
  },
  {
    id: "weight-gain",
    name: "Weight Gain",
    description: "Unexplained weight gain or difficulty losing weight",
    details: {
      overview: "Hypothyroidism slows down your metabolism, making it easier to gain weight and harder to lose it. This weight gain often occurs even without changes in diet or exercise habits.",
      managementTips: [
        "Focus on nutrient-dense, whole foods",
        "Keep a food diary to track intake",
        "Exercise regularly, starting with gentle activities",
        "Stay hydrated with water",
        "Get adequate sleep to support metabolism"
      ],
      whenToSeekHelp: [
        "Rapid weight gain without diet changes",
        "Unable to lose weight despite healthy lifestyle",
        "Weight gain accompanied by swelling",
        "Significant changes in appetite"
      ],
      relatedSymptoms: [
        "Fatigue",
        "Water retention",
        "Decreased appetite",
        "Muscle weakness"
      ]
    }
  }
];

