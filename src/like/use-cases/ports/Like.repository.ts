import { ToggleLikeDto } from "src/like/infra/dtos/ToggleLike.dto";

export abstract class LikeRepository {
  abstract like(data: ToggleLikeDto): Promise<void>;
  abstract unlike(data: ToggleLikeDto): Promise<void>;
  abstract getAllByPost(postId: number): Promise<number>;
}