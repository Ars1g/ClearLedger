import { z } from "zod";

export const transactionSchema = z.object({
  date: z.date({ message: "Select a date please" }),
  description: z
    .string()
    .max(1000)
    .min(2, { message: "Description must be at least 2 characters" }),
  amount: z.coerce
    .number()
    .refine((num) => num > 0, { message: "Amount must be above 0" }),
  category: z.string().min(1, { message: "Category is required" }),
  category_id: z.coerce.number(),
  id: z.number().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter and one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type TransactionData = z.infer<typeof transactionSchema>;
