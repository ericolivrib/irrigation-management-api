import z from "zod";
import { registerUserSchema } from "../schemas/register-user.schema";

export type RegisterUserRequestBody = z.infer<typeof registerUserSchema>;