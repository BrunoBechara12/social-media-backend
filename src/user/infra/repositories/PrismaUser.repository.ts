import { UserRepository } from "src/user/use-cases/ports/User.repository";
import { UpdateProfileDto } from "../dtos/UpdateProfile.dto";
import { PrismaService } from "src/infra/database/database.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UpdateCredentialsDto } from "../dtos/UpdateCredentials.dto";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService){}

  async getById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id
      }
    });

    if (!user) {
      return null;
    }

    return user
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email
      }
    });

    return user;
  }

  async getByUsername(username: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username
      }
    });

    return user;
  }

  async updateProfile(UpdateUser: UpdateProfileDto): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: UpdateUser.id
      },
      data: UpdateUser
    })
  }

  async updateCredentials(UpdateUser: UpdateCredentialsDto): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: UpdateUser.id
      },
      data: UpdateUser
    })
  }  
}