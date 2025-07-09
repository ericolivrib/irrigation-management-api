import z from "zod";

export const createPivotRequestSchema = z.object({
  description: z.string().min(5, "Description must have 5 or more characters"),
  flowRate: z.number().positive("Flow rate must be a positive number").min(1, "Flow rate is required"),
  minApplicationDepth: z.number().positive("Minimum application depth must be a positive number").min(1, "Minimum application depth is required"),
});