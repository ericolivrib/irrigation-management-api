import z from "zod";

export const createPivotRequestSchema = z.object({
  description: z
    .string({ required_error: 'Description is required' })
    .min(5, 'Description must have 5 or more characters')
    .max(50, 'Description must have 50 or less characters'),
  flowRate: z
    .number({ required_error: 'Flow rate is required' })
    .positive('Flow rate must be a positive number'),
  minApplicationDepth: z
    .number({ required_error: 'Min application depth is required' })
    .positive('Minimum application depth must be a positive number')
});