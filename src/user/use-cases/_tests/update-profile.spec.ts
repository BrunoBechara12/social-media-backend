import { MakeUser } from "@test/factories/User.factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUser.repository";
import { UpdateProfile } from "../UpdateProfile";
import { UserMapper } from "../../domain/mappers/User.mapper";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdateProfileDto } from "../../infra/dtos/UpdateProfile.dto";

describe('Update user profile', () => {
  let updateProfile: UpdateProfile;
  let userRepository: InMemoryUserRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    updateProfile = new UpdateProfile(userRepository);
  });

  it('Should be able to update all profile fields', async () => {
    const user = MakeUser();
    userRepository.users.push(UserMapper.toPrisma(user));

    const beforeUpdate = new Date();

    const updateProfileDto: UpdateProfileDto = {
      id: user.id,
      username: 'newusername',
      bio: 'New cool bio',
      avatar: 'new-avatar-url.jpg',
      updatedAt: new Date()
    };

    await updateProfile.execute(updateProfileDto);

    const updatedUser = userRepository.users.find(u => u.id === user.id);

    expect(updatedUser).toBeTruthy();
    expect(updatedUser?.username).toBe('newusername');
    expect(updatedUser?.bio).toBe('New cool bio');
    expect(updatedUser?.avatar).toBe('new-avatar-url.jpg');
    expect(updatedUser?.updatedAt).toBeInstanceOf(Date);
    expect(updatedUser?.updatedAt!.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
  });

  it('Should not be able to update profile for a user that does not exist', async () => {
    const updateProfileDto: UpdateProfileDto = {
      id: 999,
      username: 'newusername',
      bio: 'New cool bio',
      avatar: 'new-avatar-url.jpg',
      updatedAt: new Date()
    };

    const user = updateProfile.execute(updateProfileDto)

    await expect(user).rejects.toThrow(new HttpException("Usuário não encontrado para o id informado", HttpStatus.NOT_FOUND)
    );
  });

  it('Should maintain existing field values when they are not included in the update', async () => {
    const user = MakeUser();    
    const originalUsername = user.username;
    
    userRepository.users.push(UserMapper.toPrisma(user));

    const updateProfileDto: UpdateProfileDto = {
      id: user.id,
      username: '',
      bio: '',
      avatar: 'new avatar',
      updatedAt: new Date()
    };

    await updateProfile.execute(updateProfileDto);

    const updatedUser = userRepository.users.find(u => u.id === user.id);

    expect(updatedUser).toBeTruthy();
    expect(updatedUser?.avatar).toBe('new avatar');  
    expect(updatedUser?.username).toBe(originalUsername);  
    expect(updatedUser?.bio).toBe('');
  });

  it('Should update updatedAt', async () => {
    const user = MakeUser();
    userRepository.users.push(UserMapper.toPrisma(user));
    
    const beforeUpdate = new Date();

    const updateProfileDto: UpdateProfileDto = {
      id: user.id,
      username: '',
      bio: 'Only updating bio',
      avatar: '',
      updatedAt: new Date()
    };

    await updateProfile.execute(updateProfileDto);

    const updatedUser = userRepository.users.find(u => u.id === user.id);
    const afterUpdate = new Date();

    expect(updatedUser?.updatedAt).toBeInstanceOf(Date);
    expect(updatedUser?.updatedAt!.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
    expect(updatedUser?.updatedAt!.getTime()).toBeLessThanOrEqual(afterUpdate.getTime());
  });
});
