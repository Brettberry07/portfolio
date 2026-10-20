import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Use 100 characters or fewer."),
  email: z.string().trim().max(254).pipe(z.email("Please enter a valid email address.")),
  organization: z.string().trim().max(120, "Use 120 characters or fewer.").optional().default(""),
  message: z.string().trim().min(20, "Please share at least 20 characters.").max(4000, "Use 4,000 characters or fewer."),
  website: z.string().max(0, "Submission could not be accepted.").optional().default(""),
});

export type ContactField = "name" | "email" | "organization" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;
