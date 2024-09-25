export type GuidesCard = {
  id: string;
  title: string;
  image: string;
  description: string;
  status: GuideStatus;
  editor: string;
  created_at: string;
  updated_at: string;
};

type GuideStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
