import { Injectable } from '@nestjs/common';
import { CommentRepository } from './ports/Comment.repository';
import { Comment } from '@prisma/client';

@Injectable()
export class GetAllByPost {
  constructor(private commentRepository: CommentRepository) {}

  async execute(postId: number): Promise<Comment[]> {
    const comments = await this.commentRepository.getAllByPost(postId);
    
    return comments;
  } 
}
