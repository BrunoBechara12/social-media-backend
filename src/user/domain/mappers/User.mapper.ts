import { User as PrismaUser } from '@prisma/client';
import { User } from '../entities/User.entity';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(
      {   
        id: raw.id, 
        email: raw.email,  
        username: raw.username,
        password: raw.password,
        bio: raw.bio,
        avatar: raw.avatar,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      }, 
    );
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id, 
      email: user.email,
      username: user.username,
      bio: user.bio ?? null,
      avatar: user.avatar ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? null,
      password: user.password
    };
  }
}