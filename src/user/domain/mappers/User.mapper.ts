import { User as PrismaUser } from '@prisma/client';
import { User } from '../entities/User.entity';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(
      {   
        id: raw.id,  
        email: raw.email,  
        username: raw.username,
        bio: raw.bio,
        avatar: raw.avatar,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
    );
  }
}
