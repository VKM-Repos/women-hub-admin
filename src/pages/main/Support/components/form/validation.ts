import { z } from "zod";

export const createFAQSchema = z.object({
  question: z.string().min(2, "Title must not be less than 2 characters"),
  answer: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(1500, "Description must be at most 1500 characters"),
  category: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createGuideSchema = z.object({
  title: z.string().min(2, "Title must not be less than 2 characters"),
  body: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(1500, "Description must be at most 1500 characters"),
  coverImageUrl: z.string().optional(),
});

export const createHelplineSchema = z.object({
  name: z.string().min(2, "Title must not be less than 2 characters"),
  phone: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(1500, "Description must be at most 1500 characters"),
  state_id: z.string(),
});
