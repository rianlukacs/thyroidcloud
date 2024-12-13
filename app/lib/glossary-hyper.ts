export interface GlossaryTerm {
  term: string;
  definition: string;
  details: string;
  normalRange?: string;
  relatedTerms: string[];
}

export const hyperthyroidismGlossary: GlossaryTerm[] = [
  {
    term: "Thyroid",
    definition: "A butterfly-shaped gland in the neck that produces hormones to regulate metabolism.",
    details: "In hyperthyroidism, the thyroid gland produces too much thyroid hormone, leading to an acceleration of many bodily functions.",
    relatedTerms: ["TSH", "T4", "T3", "Graves' Disease", "Thyroid Storm"]
  },
  {
    term: "TSH",
    definition: "Thyroid Stimulating Hormone, produced by the pituitary gland to regulate thyroid hormone production.",
    details: "In hyperthyroidism, TSH levels are typically low as the body tries to reduce thyroid hormone production.",
    normalRange: "0.4 to 4.0 mIU/L (may vary by lab)",
    relatedTerms: ["Thyroid", "T4", "T3", "Pituitary Gland"]
  },
  {
    term: "Graves' Disease",
    definition: "An autoimmune disorder that is the most common cause of hyperthyroidism.",
    details: "In this condition, the immune system stimulates the thyroid gland to produce excess thyroid hormones.",
    relatedTerms: ["Hyperthyroidism", "Autoimmune Disorder", "TSI (Thyroid Stimulating Immunoglobulin)"]
  },
  {
    term: "Thyroid Storm",
    definition: "A rare but life-threatening condition of extremely high thyroid hormone levels.",
    details: "It's a severe exacerbation of hyperthyroidism that can lead to multi-organ failure if not treated promptly.",
    relatedTerms: ["Hyperthyroidism", "Medical Emergency", "Thyrotoxicosis"]
  },
];

