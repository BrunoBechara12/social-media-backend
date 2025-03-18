import { User } from "@prisma/client";
import { UpdateCredentialsDto } from "src/user/infra/dtos/UpdateCredentials.dto";
import { UpdateProfileDto } from "src/user/infra/dtos/UpdateProfile.dto";

export abstract class UserRepository {
  abstract updateProfile(UpdateUser: UpdateProfileDto): Promise<void>;
  abstract updateCredentials(UpdateUser: UpdateCredentialsDto): Promise<void>;
  abstract getById(id: number): Promise<User | null>;
  abstract getByEmail(email: string): Promise<User | null>;
  abstract getByUsername(username: string): Promise<User | null>;
}