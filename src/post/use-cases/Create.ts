
import { PostRepository } from './ports/Post.repository';
import { CreatePostDto } from '../infra/dtos/CreatePost.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/use-cases/ports/User.repository';

@Injectable()
export class Create {
  constructor(private postRepository: PostRepository, private userRepository: UserRepository) {}

  async execute(request: CreatePostDto): Promise<void> {

    const user = await this.userRepository.getById(request.authorId)

    if(!user){
      throw new HttpException("Usuário não encontrado para o id informado", HttpStatus.NOT_FOUND)
    }

    await this.postRepository.create(request)
  } 
}
