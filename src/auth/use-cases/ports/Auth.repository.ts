import { User } from "@prisma/client";
import { LoginUserDto } from "../../infra/dtos/LoginUser.dto";
import { RegisterUserDto } from "../../infra/dtos/RegisterUser.dto";

export abstract class AuthRepository {
  abstract register(registerUser: RegisterUserDto): Promise<void>;
  abstract login(loginUser: LoginUserDto): Promise<User | null>;
}