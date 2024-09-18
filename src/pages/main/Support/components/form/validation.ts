import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const createFAQSchema = z.object({
  question: z.string().min(2, "Title must not be less than 2 characters"),
  answer: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(1500, "Description must be at most 1500 characters"),
  category: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.string(),
});

export const createGuideSchema = z.object({
  title: z.string().min(2, "Title must not be less than 2 characters"),
  content: z
    .string()
    .min(2, "Content must be at least 2 characters")
    .max(1500, "Content must be at most 1500 characters"),
  coverImage: z
    .any()
    .refine(
      (file) =>
        file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are allowed"
    )
    .refine(
      (file) => file instanceof File && file.size <= MAX_IMAGE_SIZE,
      "Max file size is 5MB"
    ),
  // coverImage: z.union([z.string(), z.instanceof(File)]).optional(), // Accept both string and File
});

export const createHelplineSchema = z.object({
  name: z.string().min(2, "Title must not be less than 2 characters"),
  phone: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(1500, "Description must be at most 1500 characters"),
  state_id: z.string(),
  status: z.string(),
});
