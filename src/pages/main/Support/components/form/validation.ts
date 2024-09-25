import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber.startsWith("+234")) {
    return phoneNumber;
  }

  if (phoneNumber.startsWith("0") && phoneNumber.length === 11) {
    return "+234" + phoneNumber.slice(1);
  }

  // Return the original phone number if it doesn't match either pattern
  return phoneNumber;
}

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
});

export const createHelplineSchema = z.object({
  name: z.string().min(2, "Title must not be less than 2 characters"),
  phone: z
    .string()
    .transform((value) => formatPhoneNumber(value)) // Apply the formatPhoneNumber transformation
    .refine(
      (value) => value.startsWith("+234") && value.length === 14,
      "Phone number must be in the format +234XXXXXXXXXX"
    ),
  state_id: z.string(),
  status: z.string(),
});

export const editGuideSchema = z.object({
  title: z.string().min(2, "Title must not be less than 2 characters"),
  content: z
    .string()
    .min(2, "Content must be at least 2 characters")
    .max(1500, "Content must be at most 1500 characters"),

  // Cover image can either be a File or a string (existing image URL)
  coverImage: z
    .union([z.string(), z.instanceof(File)])
    .refine(
      (fileOrUrl) =>
        typeof fileOrUrl === "string" ||
        (fileOrUrl instanceof File &&
          ACCEPTED_IMAGE_TYPES.includes(fileOrUrl.type)),
      "Only .jpg, .jpeg, and .png formats are allowed"
    )
    .refine(
      (fileOrUrl) =>
        typeof fileOrUrl === "string" ||
        (fileOrUrl instanceof File && fileOrUrl.size <= MAX_IMAGE_SIZE),
      "Max file size is 5MB"
    ),
});
