export interface GlossaryTerm {
  term: string;
  definition: string;
  details: string;
  normalRange?: string;
  relatedTerms: string[];
}

export const hypothyroidismGlossary: GlossaryTerm[] = [
  {
    term: "Thyroid",
    definition: "A butterfly-shaped gland in the neck that produces hormones to regulate metabolism.",
    details: "In hypothyroidism, the thyroid gland doesn't produce enough thyroid hormones, leading to a slowdown of many bodily functions.",
    relatedTerms: ["TSH", "T4", "T3", "Levothyroxine", "Hashimoto's Thyroiditis"]
  },
  {
    term: "TSH",
    definition: "Thyroid Stimulating Hormone, produced by the pituitary gland to regulate thyroid hormone production.",
    details: "In hypothyroidism, TSH levels are typically elevated as the body tries to stimulate the thyroid to produce more hormones.",
    normalRange: "0.4 to 4.0 mIU/L (may vary by lab)",
    relatedTerms: ["Thyroid", "T4", "T3", "Pituitary Gland"]
  },
  {
    term: "Levothyroxine",
    definition: "A synthetic form of the thyroid hormone thyroxine (T4) used to treat hypothyroidism.",
    details: "It's the most common treatment for hypothyroidism, replacing the hormone that the thyroid gland cannot produce in sufficient quantities.",
    relatedTerms: ["T4", "Hypothyroidism", "Thyroid Hormone Replacement"]
  },
  {
    term: "Hashimoto's Thyroiditis",
    definition: "An autoimmune disorder that is the most common cause of hypothyroidism.",
    details: "In this condition, the immune system attacks the thyroid gland, leading to inflammation and reduced thyroid hormone production.",
    relatedTerms: ["Hypothyroidism", "Autoimmune Disorder", "Thyroid Antibodies"]
  },
];

