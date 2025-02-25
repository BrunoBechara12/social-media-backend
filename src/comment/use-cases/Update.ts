import { Injectable } from '@nestjs/common';
import { CommentRepository } from './ports/Comment.repository';
import { UpdateCommentDto } from '../infra/dtos/UpdateComment.dto';

@Injectable()
export class Update {
  constructor(private commentRepository: CommentRepository) {}

  async execute(data: UpdateCommentDto): Promise<void> {

    const commentUpdated: UpdateCommentDto = {
      ...data,
      updatedAt: new Date()
    }

    await this.commentRepository.update(commentUpdated)
  } 
}
