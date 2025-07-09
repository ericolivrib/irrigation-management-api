import z from "zod";

export const registerUserSchema = z.object({
  username: z.string().trim().min(3, "User name must have 3 or more characters").max(50, "User name must have 50 or less characters"),
  password: z.string().trim().min(8, "Password must have 8 or more characters")
});