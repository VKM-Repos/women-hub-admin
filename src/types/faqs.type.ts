export type Faq = {
  id: string;
  title: string;
  date: string;
  status: FaqStatus;
  editor: string;
  category: string;
};

type FaqStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED" | null;
