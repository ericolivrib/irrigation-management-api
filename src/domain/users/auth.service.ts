import { randomUUID } from "node:crypto";
import { User } from "../../models/user.model";
import { RegisterUserRequestBody } from "./dtos/register-user-request-body.dto";
import { RegisterUserResponseBody } from "./dtos/register-user-response-body.dto";
import { genSalt, hash } from "bcryptjs";

const users: User[] = [];
const SALT_ROUNDS = 10;

export const authService = {
  registerUser: async (newUser: RegisterUserRequestBody): Promise<RegisterUserResponseBody> => {
    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(newUser.password, salt);

    const user: User = {
      id: randomUUID(),
      username: newUser.username,
      password: hashedPassword,
    };

    users.push(user);

    return {
      id: user.id,
      username: user.username
    };
  },
}
