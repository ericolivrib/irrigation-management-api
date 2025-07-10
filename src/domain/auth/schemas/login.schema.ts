import z from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: 'User name is required' })
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
});
