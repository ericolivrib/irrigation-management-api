import z from "zod";
import { registerUserRequestSchema } from "../schemas/register-user-request.schema";

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;