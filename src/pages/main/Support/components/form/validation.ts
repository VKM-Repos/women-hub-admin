import { z } from "zod";

export const createGuideSchema = z.object({
  title: z.string().min(2, "Title must not be less than 2 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(1500, "Description must be at most 1500 characters"),
  coverImageUrl: z.string().optional(),
  categoryId: z.string(),
  body: z.string(),
});
