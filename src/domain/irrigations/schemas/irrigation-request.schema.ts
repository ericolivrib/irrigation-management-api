import z from "zod";

export const irrigationRequestSchema = z.object({
  pivotId: z.string({ required_error: 'Pivot ID is required' }).uuid(),
  applicationAmount: z
    .number({ required_error: 'Application amount is required' })
    .positive('Application amount must be a positive number'),
  irrigationDate: z.coerce.date({
    required_error: 'Irrigation date is required',
    invalid_type_error: 'Irrigation date must be a valid date'
  }).refine((date) => date <= new Date(), { message: 'Irrigation date must not be in the future' })
});