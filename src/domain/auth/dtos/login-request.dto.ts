import z from "zod";
import { loginRequestSchema } from "../schemas/login-request.schema";

export type LoginRequest = z.infer<typeof loginRequestSchema>;