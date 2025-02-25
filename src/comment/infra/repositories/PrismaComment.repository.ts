import { PrismaService } from "src/infra/database/database.service";
import { Injectable } from "@nestjs/common";
import { CommentRepository } from "src/comment/use-cases/ports/Comment.repository";
import { CreateCommentDto } from "../dtos/CreateComment.dto";
import { UpdateCommentDto } from "../dtos/UpdateComment.dto";
import { CreateReplyDto } from "../dtos/CreateReply.dto";
import { Comment } from "@prisma/client";

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
  constructor(private prismaService: PrismaService){}

  async create(data: CreateCommentDto): Promise<void> {
    await this.prismaService.comment.create({
      data: data
    })
  }

  async createReply(data: CreateReplyDto): Promise<void> {
    await this.prismaService.comment.create({
      data: data
    })
  }

  async update(data: UpdateCommentDto): Promise<void> {
    await this.prismaService.comment.update({
      where: { id: data.commentId },
      data: {
        content: data.content,
        updatedAt: data.updatedAt
      }
    })
  }

  async getAllByPost(postId: number): Promise<Comment[]> {
    const comments = await this.prismaService.comment.findMany({
      where: { postId: postId }
    })

    return comments;
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.comment.delete({
      where: { id: id }
    })
  }
}