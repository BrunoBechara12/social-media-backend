import { Injectable } from "@nestjs/common";
import { RegisterUserDto } from "src/auth/infra/dtos/RegisterUser.dto";
import { AuthRepository } from "./ports/Auth.repository";
import { HashServiceProtocol } from "../infra/adapters/hash/hash.service";

@Injectable()
export class Register {
  constructor(private authRepository: AuthRepository, private hashService: HashServiceProtocol) {}

  async execute(registerUser: RegisterUserDto): Promise<void> {
    const passwordHash = await this.hashService.hash(registerUser.password)

    const register: RegisterUserDto = {
      ...registerUser,
      password: passwordHash
    }

    await this.authRepository.register(register);
  }
}
