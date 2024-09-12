export type Guide = {
  id: string;
  title: string;
  image: string;
  date: string;
  status: GuideStatus;
  editor: string;
};

type GuideStatus = "Draft" | "Published" | "Archived" | null;
