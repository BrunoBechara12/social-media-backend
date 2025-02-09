import { Post as PrismaPost } from '@prisma/client';
import { Post } from '../entities/Post.entity';

export class PostMapper {
  static toDomain(raw: PrismaPost): Post {
    return new Post(
      {
        id: raw.id,
        content: raw.content,
        images: raw.images,
        authorId: raw.authorId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      }
    );
  }

  static toPrisma(post: Post): PrismaPost {
    return {
      id: post.id,
      content: post.content,
      images: post.images,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt ?? null
    };
  }
}