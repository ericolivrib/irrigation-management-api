import z from "zod";

export const registerUserRequestSchema = z.object({
  username: z
    .string({ required_error: 'User name is required' })
    .min(5, 'User name must have 5 or mode characters')
    .max(40, 'User name must have 40 or less characters')
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, "Password must have 8 or more characters")
    .trim()
});