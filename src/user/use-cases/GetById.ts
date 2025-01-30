import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './ports/User.repository';
import { User } from '../domain/entities/User.entity';
import { UserMapper } from '../domain/mappers/User.mapper';

@Injectable()
export class GetById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    const user = await this.userRepository.getById(id)

    if(!user){
      throw new HttpException("Usuário não encontrado para o id informado", HttpStatus.NOT_FOUND)
    }

    return UserMapper.toDomain(user)
  }
}
