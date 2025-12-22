import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(25),
  password: z.string().min(6),
  role: z.enum(["admin", "user"]).optional(),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
