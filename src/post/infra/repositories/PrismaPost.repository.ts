import { Post } from "@prisma/client";
import { PostRepository } from "src/post/use-cases/ports/Post.repository";
import { CreatePostDto } from "../dtos/CreatePost.dto";
import { UpdatePostDto } from "../dtos/UpdatePost.dto";
import { PrismaService } from "src/infra/database/database.service";
import { Injectable } from "@nestjs/common";
import { PostResponseDto } from "../dtos/PostResponse.dto";

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private prismaService: PrismaService){}
  
  async getAll(): Promise<PostResponseDto[]> {
    const posts = await this.prismaService.post.findMany({
      include: {
        likes: true,
        comments: true
      }
    })

    return posts.map(post => ({
      ...post,
      likes: post.likes.length,
      comments: post.comments.length
    }))
  }

  async getById(id: number): Promise<Post | null> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: id
      }
    })

    return post
  }

  async getAllByAuthor(id: number): Promise<Post[] | null> {
    const posts = await this.prismaService.post.findMany({
      where: {
        authorId: id
      }
    })

    return posts
  }

  async create(createPost: CreatePostDto): Promise<void> {
    await this.prismaService.post.create({
      data: {
        content: createPost.content,
        images: createPost.images,
        authorId: createPost.authorId,
      }
    })
  }

  async update(UpdatePost: UpdatePostDto): Promise<void> {
    await this.prismaService.post.update({
      where: {
        id: UpdatePost.id
      },
      data: UpdatePost
    })
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.post.delete({
      where: {
        id: id
      }
    })
  }
}