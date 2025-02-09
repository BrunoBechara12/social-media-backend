
import { PostRepository } from './ports/Post.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Delete {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number): Promise<void> {
    await this.postRepository.delete(id)
  } 
}
