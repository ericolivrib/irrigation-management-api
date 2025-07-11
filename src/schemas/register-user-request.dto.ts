import z from "zod";
import { registerUserRequestSchema } from "./register-user-request.schema";

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;