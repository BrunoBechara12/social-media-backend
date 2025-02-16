import { Injectable } from '@nestjs/common';
import { LikeRepository } from './ports/Like.repository';
import { ToggleLikeDto } from '../infra/dtos/ToggleLike.dto';

@Injectable()
export class Like {
  constructor(private likeRepository: LikeRepository) {}

  async execute(request: ToggleLikeDto): Promise<void> {
    await this.likeRepository.like(request)
  } 
}
