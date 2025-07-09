import z from "zod";
import { createPivotRequestSchema } from "../schema/create-pivot-request.schema";

export type CreatePivotRequest = z.infer<typeof createPivotRequestSchema>;