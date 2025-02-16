import { Like } from "@prisma/client";
import { LikeRepository } from "src/like/use-cases/ports/Like.repository";
import { ToggleLikeDto } from "src/like/infra/dtos/ToggleLike.dto";


export class InMemoryLikeRepository implements LikeRepository {
  private likes: Like[] = [];

  async like(toggleLikeDto: ToggleLikeDto): Promise<void> {

    const like: Like = {
      id: 1,
      postId: toggleLikeDto.postId,
      userId: toggleLikeDto.userId,
      createdAt: new Date(),
      updatedAt: null
    };

    this.likes.push(like);
  }

  async unlike(toggleLikeDto: ToggleLikeDto): Promise<void> {
    const like = this.likes.findIndex(
      like => like.userId === toggleLikeDto.userId && like.postId === toggleLikeDto.postId
    );

    if (like === -1) {
      throw new Error('Like not found');
    }

    this.likes.splice(like);
  }

  async getAllByPost(postId: number): Promise<number> {
    
    const likes = this.likes.filter(like => like.postId == postId);

    return likes.length
  }
}