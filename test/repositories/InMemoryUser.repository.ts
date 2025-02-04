import { UpdateCredentialsDto } from "src/user/infra/dtos/UpdateCredentials.dto";
import { UpdateProfileDto } from "src/user/infra/dtos/UpdateProfile.dto";
import { UserRepository } from "src/user/use-cases/ports/User.repository";
import { User } from "@prisma/client";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async updateProfile(updateUser: UpdateProfileDto): Promise<void> {
    const user = this.users.find(user => user.id === updateUser.id);
    if (!user) throw new Error("User not found.");
    Object.assign(user, updateUser, { updatedAt: new Date() });
  }

  async updateCredentials(updateUser: UpdateCredentialsDto): Promise<void> {
    const user = this.users.find(user => user.id === updateUser.id);
    if (!user) throw new Error("User not found.");
    Object.assign(user, updateUser, { updatedAt: new Date() });
  }

  async getById(id: number): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    return user || null;
  }
}