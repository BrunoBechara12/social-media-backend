import { Injectable } from '@nestjs/common';
import { CommentRepository } from './ports/Comment.repository';


@Injectable()
export class Delete {
  constructor(private commentRepository: CommentRepository) {}

  async execute(data: number): Promise<void> {
    await this.commentRepository.delete(data);
  } 
}
