import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from '../infra/dtos/UpdateProfile.dto';
import { UserRepository } from './ports/User.repository';
import { IsNullOrEmpty } from 'src/helpers/IsNullOrEmpty';

@Injectable()
export class UpdateProfile {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateProfileDto): Promise<any> {

    const user = await this.userRepository.getById(request.id)

    if(!user){
      throw new HttpException("Usuário não encontrado para o id informado", HttpStatus.NOT_FOUND)
    }

    const userUpdated: UpdateProfileDto = {
      ...request,
      username: IsNullOrEmpty(request.username) ? user.username : request.username,
      updatedAt: new Date()
    };

    await this.userRepository.updateProfile(userUpdated);
  }
}
