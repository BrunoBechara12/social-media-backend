import { PrismaService } from "src/infra/database/database.service";
import { Injectable } from "@nestjs/common";
import { LikeRepository } from "src/like/use-cases/ports/Like.repository";
import { ToggleLikeDto } from "../dtos/ToggleLike.dto";

@Injectable()
export class PrismaLikeRepository implements LikeRepository {
  constructor(private prismaService: PrismaService){}

  async like(data: ToggleLikeDto): Promise<void> {
    await this.prismaService.like.create({
      data: {
        userId: data.userId,
        postId: data.postId
      }
    })
  }

  async unlike(data: ToggleLikeDto): Promise<void> {
    await this.prismaService.like.delete({
      where: {
        userId_postId: {
          postId: data.postId,
          userId: data.userId
        }
      }
    })
  }

  async getAllByPost(postId: number): Promise<number> {
    const likes = await this.prismaService.like.count({
      where: {
        postId: postId
      }
    })

    return likes
  }
}