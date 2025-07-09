import z from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "User name is mandatory"),
  password: z.string().trim().min(1, "Password is mandatory")
});