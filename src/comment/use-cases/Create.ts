import { Injectable } from '@nestjs/common';
import { CommentRepository } from './ports/Comment.repository';
import { CreateCommentDto } from '../infra/dtos/CreateComment.dto';

@Injectable()
export class Create {
  constructor(private commentRepository: CommentRepository) {}

  async execute(data: CreateCommentDto): Promise<void> {
    await this.commentRepository.create(data)
  } 
}
