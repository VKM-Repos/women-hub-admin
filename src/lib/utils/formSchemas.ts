import { z } from "zod";

export const ProfileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().min(2, { message: "Bio is required." }),
});

export const PasswordFormSchema = z.object({
  oldPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const FooterFormSchema = z.object({
  facebookLink: z.string(),
  twitterLink: z.string(),
  linkedinLink: z.string(),
  instagramLink: z.string(),
  privacyPolicy: z.boolean().default(false).optional(),
  termsAndCondition: z.boolean().default(false).optional(),
  gdprCompliance: z.boolean().default(false).optional(),
});

export const CategoryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  about: z.string(),
});

export const ComposeMessageSchema = z.object({
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters." }),
  tags: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one framework."),
});
