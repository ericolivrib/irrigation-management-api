import z from "zod";
import { pivotRequestSchema } from "../schemas/pivot-request.schema";

export type PivotRequest = z.infer<typeof pivotRequestSchema>;