export type Guide = {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  status: GuideStatus;
  editor: string;
};

type GuideStatus = "Draft" | "Published" | "Archived" | null;
