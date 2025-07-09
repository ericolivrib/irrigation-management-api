import z from "zod";

export const registerUserSchema = z.object({
  username: z.string().trim().min(3, "Nome de usuário deve ter pelo menos 3 caracteres").max(50, "Nome de usuário deve ter no máximo 50 caracteres"),
  password: z.string().trim().min(8, "Senha deve ter pelo menos 8 caracteres"),
});