
import { PostRepository } from './ports/Post.repository';
import { CreatePostDto } from '../infra/dtos/CreatePost.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from '../domain/entities/Post.entity';
import { PostMapper } from '../domain/mappers/Post.mapper';

@Injectable()
export class GetById {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number): Promise<Post> {
    const post = await this.postRepository.getById(id);

    if(!post){
      throw new HttpException("Post não encontrado para o id informado", HttpStatus.NOT_FOUND)
    }

    return PostMapper.toDomain(post);
  }
}
