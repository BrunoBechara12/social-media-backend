
import { PostRepository } from './ports/Post.repository';
import { CreatePostDto } from '../infra/dtos/CreatePost.dto';
import { Injectable } from '@nestjs/common';
import { Post } from '../domain/entities/Post.entity';
import { PostMapper } from '../domain/mappers/Post.mapper';

@Injectable()
export class GetAll {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    const posts = await this.postRepository.getAll()

    return posts.map(PostMapper.toDomain);
  }
}
