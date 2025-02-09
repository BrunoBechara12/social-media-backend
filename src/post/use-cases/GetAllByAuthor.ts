
import { PostRepository } from './ports/Post.repository';
import { CreatePostDto } from '../infra/dtos/CreatePost.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from '../domain/entities/Post.entity';
import { PostMapper } from '../domain/mappers/Post.mapper';

@Injectable()
export class GetAllByAuthor {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number): Promise<Post[]> {
    const posts = await this.postRepository.getAllByAuthor(id);

    if(!posts || posts.length == 0){
      throw new HttpException("O usuario ainda não realizou nenhum post", HttpStatus.NOT_FOUND)
    } 

    return posts.map(PostMapper.toDomain)   
  } 
}
