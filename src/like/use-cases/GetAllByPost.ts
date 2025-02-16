import { Injectable } from '@nestjs/common';
import { LikeRepository } from './ports/Like.repository';

@Injectable()
export class GetAllByPost {
  constructor(private likeRepository: LikeRepository) {}

  async execute(idPost: number): Promise<number> {
    const likes = await this.likeRepository.getAllByPost(idPost)

    return likes
  } 
}
