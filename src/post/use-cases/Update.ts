
import { IsNullOrEmpty } from '../../helpers/IsNullOrEmpty';
import { UpdatePostDto } from '../infra/dtos/UpdatePost.dto';
import { PostRepository } from './ports/Post.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class Update {
  constructor(private postRepository: PostRepository) {}

  async execute(request: UpdatePostDto): Promise<void> {

    const post = await this.postRepository.getById(request.id)

    if(!post){
      throw new HttpException("Post não encontrado", HttpStatus.NOT_FOUND)
    }

    const postUpdated: UpdatePostDto = {
          ...request,
          content: IsNullOrEmpty(request.content) ? post.content : request.content,
          images: Array.isArray(request.images) ? request.images : post.images,
          updatedAt: new Date()
        };

    await this.postRepository.update(postUpdated)
  } 
}
