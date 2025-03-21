import { RegisterUserDto } from "@src/auth/infra/dtos/RegisterUser.dto";
import { LoginUserDto } from "@src/auth/infra/dtos/LoginUser.dto";

export function MakeRegisterUser(overrides?: Partial<RegisterUserDto>): RegisterUserDto {
  return {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    ...overrides
  };
}

export function MakeLoginUser(overrides?: Partial<LoginUserDto>): LoginUserDto {
  return {
    email: 'test@example.com',
    password: 'password123',
  };
}
