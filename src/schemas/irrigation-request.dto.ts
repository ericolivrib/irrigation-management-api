import z from "zod";
import { irrigationRequestSchema } from '../schemas/irrigation-request.schema';

export type IrrigationRequest = z.infer<typeof irrigationRequestSchema>;