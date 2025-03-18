import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegisterUserDto } from "src/auth/infra/dtos/RegisterUser.dto";
import { AuthRepository } from "./ports/Auth.repository";
import { HashServiceProtocol } from "../infra/adapters/hash/hash.service";
import { UserRepository } from "@src/user/use-cases/ports/User.repository";

@Injectable()
export class Register {
  constructor(private authRepository: AuthRepository, private userRepository: UserRepository, private hashService: HashServiceProtocol) {}

  async execute(registerUser: RegisterUserDto): Promise<void> {
    const existingEmail = await this.userRepository.getByEmail(registerUser.email);
    const existingUsername = await this.userRepository.getByUsername(registerUser.username);

    if (existingEmail?.email == registerUser.email) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    
    if (existingUsername?.username == registerUser.username) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    const passwordHash = await this.hashService.hash(registerUser.password)

    const register: RegisterUserDto = {
      ...registerUser,
      password: passwordHash
    }

    await this.authRepository.register(register);
  }
}
