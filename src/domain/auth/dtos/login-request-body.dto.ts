import z from "zod";
import { loginSchema } from "../schemas/login.schema";

export type LoginRequestBody = z.infer<typeof loginSchema>;