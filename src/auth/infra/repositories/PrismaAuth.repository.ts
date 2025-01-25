
import { AuthRepository } from "../../use-cases/ports/Auth.repository";
import { LoginUserDto } from "../dtos/LoginUser.dto";
import { RegisterUserDto } from "../dtos/RegisterUser.dto";
import { HashServiceProtocol } from "../adapters/hash/hash.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/infra/database/database.service";

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private prisma: PrismaService){}

  async register(registerUser: RegisterUserDto): Promise<void> {
    await this.prisma.user.create({
      data: registerUser
    })
  }

  async login(loginUser: LoginUserDto): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginUser.email
      }
    })

    return user
  }
  
}