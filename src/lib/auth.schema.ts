import { z } from "zod";

export const email = z
  .string()
  .email({ message: "Please enter a valid email address" })
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(50, { message: "Password cannot exceed 50 characters" });

export const SignUpSchema = z.object({
  email,
  password,
});

export const LoginSchema = z.object({
  email,
  password: z.string(),
});
