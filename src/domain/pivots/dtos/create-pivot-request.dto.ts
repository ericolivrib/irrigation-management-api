import z from "zod";
import { createPivotRequestSchema } from "../schemas/create-pivot-request.schema";

export type CreatePivotRequest = z.infer<typeof createPivotRequestSchema>;