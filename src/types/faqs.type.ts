export type Faq = {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
  status: FaqStatus;
  editor: string;
  category: string;
};

type FaqStatus = "Draft" | "Published" | "Archived" | null;
