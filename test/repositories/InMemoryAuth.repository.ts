import { User } from "@prisma/client";
import { LoginUserDto } from "src/auth/infra/dtos/LoginUser.dto";
import { RegisterUserDto } from "src/auth/infra/dtos/RegisterUser.dto";
import { AuthRepository } from "src/auth/use-cases/ports/Auth.repository";
import { HttpException, HttpStatus } from "@nestjs/common";
import { HashServiceProtocol } from "src/auth/infra/adapters/hash/hash.service";

export class InMemoryAuthRepository implements AuthRepository {
  public users: User[] = [];
  private currentId = 1;
  private hashService: HashServiceProtocol;

  constructor(hashService: HashServiceProtocol) {
    this.hashService = hashService;
  }

  async register(registerUser: RegisterUserDto): Promise<void> {
    const userExists = this.users.find(user => user.email === registerUser.email);

    if (userExists) {
      throw new HttpException('There is already a user with this email!', HttpStatus.CONFLICT);
    }

    const hashedPassword = await this.hashService.hash(registerUser.password);

    const user: User = {
      id: this.currentId++,
      username: registerUser.username,
      email: registerUser.email,
      password: hashedPassword, 
      createdAt: new Date(),
      bio: null,
      avatar: null,
      updatedAt: null
    };

    this.users.push(user);
  }

  async login(loginUser: LoginUserDto): Promise<User | null> {
    const user = this.users.find(user => user.email === loginUser.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await this.hashService.compare(loginUser.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}