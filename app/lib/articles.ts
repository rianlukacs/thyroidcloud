export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  source: string;
  sourceUrl: string;
  date: string;
  readTime: string;
  condition: 'hypothyroidism' | 'hyperthyroidism' | 'general';
}

export const articles: Article[] = [
  {
    id: "Blood_Sugar_Hashimotos_Ozempic_Metformin_and_Berberine",
    title: "Blood Sugar, Hashimoto’s, Ozempic, Metformin and Berberine",
    description: "Learn about the causes, symptoms, and treatment options for an underactive thyroid.",
    content: "Hypothyroidism occurs when your thyroid gland doesn't produce enough thyroid hormones. This can slow down your metabolism and affect many aspects of your health...",
    source: "Dr. Izabella Wentz, PharmD",
    sourceUrl: "https://thyroidpharmacist.com/articles/blood-sugar-hashimotos-metformin-berberine/",
    date: "2024-11-15",
    readTime: "12 min read",
    condition: "hypothyroidism"
  }
];

