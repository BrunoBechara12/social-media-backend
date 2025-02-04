import { MakeUser } from "../../../../test/factories/User.factory";
import { InMemoryUserRepository } from "../../../../test/repositories/InMemoryUser.repository";
import { UpdateCredentials } from "../UpdateCredentials";
import { UserMapper } from "../../domain/mappers/User.mapper";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdateCredentialsDto } from "../../infra/dtos/UpdateCredentials.dto";
import { HashServiceProtocol } from "../../../auth/infra/adapters/hash/hash.service";

describe('Update user credentials', () => {
  let updateCredentials: UpdateCredentials;
  let userRepository: InMemoryUserRepository;
  let hashService: HashServiceProtocol;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    hashService = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn().mockResolvedValue(true)
    };
    updateCredentials = new UpdateCredentials(userRepository, hashService);
  });

  it('Should be able to update user credentials', async () => {
    const user = MakeUser();

    userRepository.users.push(UserMapper.toPrisma(user));

    const updateCredentialsDto: UpdateCredentialsDto = {
      id: user.id,
      email: 'newemail@example.com',
      password: 'newpassword'
    };

    await updateCredentials.execute(updateCredentialsDto);

    const updatedUser = userRepository.users.find(u => u.id === user.id);

    expect(updatedUser).toBeTruthy();
    expect(updatedUser?.email).toBe('newemail@example.com');
    expect(updatedUser?.password).toBe('hashed_password');
    expect(hashService.hash).toHaveBeenCalledWith('newpassword');
  });

  it('Should not be able to update credentials for a user that does not exist', async () => {
    const updateCredentialsDto: UpdateCredentialsDto = {
      id: 2,
      email: 'newemail@example.com',
      password: 'newpassword'
    };

    const update = updateCredentials.execute(updateCredentialsDto)

    expect(update).rejects.toThrow(new HttpException("Usuário não encontrado para o id informado", HttpStatus.NOT_FOUND)
  );
  });

  it('Should keep existing email when updating only password', async () => {
    const user = MakeUser();
    const originalEmail = user.email;

    userRepository.users.push(UserMapper.toPrisma(user));

    const updateCredentialsDto: UpdateCredentialsDto = {
      id: user.id,
      email: '', 
      password: 'newpassword'
    };

    await updateCredentials.execute(updateCredentialsDto);

    const updatedUser = userRepository.users.find(u => u.id === user.id);

    expect(updatedUser).toBeTruthy();
    expect(updatedUser?.email).toBe(originalEmail);
    expect(updatedUser?.password).toBe('hashed_password'); 
    expect(hashService.hash).toHaveBeenCalledWith('newpassword');
  });

  it('Should keep existing password when updating only email', async () => {
    const user = MakeUser();
    const originalPassword = user.password;

    userRepository.users.push(UserMapper.toPrisma(user));

    const updateCredentialsDto: UpdateCredentialsDto = {
      id: user.id,
      email: 'newemail@example.com',
      password: ''  
    };

    await updateCredentials.execute(updateCredentialsDto);

    const updatedUser = userRepository.users.find(u => u.id === user.id);

    expect(updatedUser).toBeTruthy();
    expect(updatedUser?.email).toBe('newemail@example.com');  
    expect(updatedUser?.password).toBe(originalPassword);  
    expect(hashService.hash).not.toHaveBeenCalled();
  });
});
