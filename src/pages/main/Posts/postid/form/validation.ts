import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const editBlogPostSchema = z.object({
  title: z.string().min(2, 'Title must not be less than 2 characters'),
  author: z.string().optional(),
  externalEditorName: z.string(),
  description: z
    .string()
    .min(2, 'Description must be at least 2 characters')
    .max(1500, 'Description must be at most 1500 characters'),
  categoryId: z.string().min(1, 'Please select a category'),
  body: z.string(),

  // Cover image can either be a File or a string (existing image URL)
  coverImage: z
    .union([z.string(), z.instanceof(File)])
    .refine(
      fileOrUrl =>
        typeof fileOrUrl === 'string' ||
        (fileOrUrl instanceof File &&
          ACCEPTED_IMAGE_TYPES.includes(fileOrUrl.type)),
      'Only .jpg, .jpeg, and .png formats are allowed'
    )
    .refine(
      fileOrUrl =>
        typeof fileOrUrl === 'string' ||
        (fileOrUrl instanceof File && fileOrUrl.size <= MAX_IMAGE_SIZE),
      'Max file size is 5MB'
    ),
});
