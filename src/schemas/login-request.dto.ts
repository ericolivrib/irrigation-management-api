import z from "zod";
import { loginRequestSchema } from "./login-request.schema";

export type LoginRequest = z.infer<typeof loginRequestSchema>;