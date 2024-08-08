export type Faq = {
  id: string;
  title: string;
  date: string;
  status: FaqStatus;
  editor: string;
};

type FaqStatus = "DRAFT" | "PUBLISH" | "ARCHIVED" | null;
