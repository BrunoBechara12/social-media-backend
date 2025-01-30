import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashServiceProtocol } from 'src/auth/infra/adapters/hash/hash.service';
import { UpdateProfileDto } from '../infra/dtos/UpdateProfile.dto';
import { UserRepository } from './ports/User.repository';
import { IsNullOrEmpty } from 'src/helpers/IsNullOrEmpty';
import { UpdateCredentialsDto } from '../infra/dtos/UpdateCredentials.dto';

@Injectable()
export class UpdateCredentials {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashServiceProtocol,
  ) {}

  async execute(request: UpdateCredentialsDto): Promise<any> {

    const user = await this.userRepository.getById(request.id)

    if(!user){
      throw new HttpException("Usuário não encontrado para o id informado", HttpStatus.NOT_FOUND)
    }

    if (!IsNullOrEmpty(request.password)) {
      request.password = await this.hashService.hash(request.password);
    }

    const credentialUpdated: UpdateCredentialsDto = {
      ...request,
      email: IsNullOrEmpty(request.email) ? user.email : request.email,
      password: IsNullOrEmpty(request.password) ? user.password : request.password,
    };

    await this.userRepository.updateCredentials(credentialUpdated);
  }
}
