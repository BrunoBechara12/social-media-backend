import { Injectable } from '@nestjs/common';
import { CommentRepository } from './ports/Comment.repository';
import { CreateReplyDto } from '../infra/dtos/CreateReply.dto';

@Injectable()
export class CreateReply {
  constructor(private commentRepository: CommentRepository) {}

  async execute(request: CreateReplyDto): Promise<void> {
    await this.commentRepository.createReply(request)
  } 
}
