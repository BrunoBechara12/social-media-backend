import { InMemoryAuthRepository } from "@test/repositories/InMemoryAuth.repository";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUser.repository";
import { Register } from "../Register";
import { HashServiceProtocol } from "../../infra/adapters/hash/hash.service";
import { MakeRegisterUser } from "@test/factories/Auth.factory";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('Register user', () => {
  let inMemoryAuthRepository: InMemoryAuthRepository;
  let inMemoryUserRepository: InMemoryUserRepository;
  let register: Register;
  let hashService: HashServiceProtocol;

  beforeEach(() => {
    hashService = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn().mockResolvedValue(true)
    };
    inMemoryAuthRepository = new InMemoryAuthRepository(hashService);
    inMemoryUserRepository = new InMemoryUserRepository();
    register = new Register(inMemoryAuthRepository, inMemoryUserRepository, hashService);
  });

  it('should register a new user', async () => {
    const userDto = MakeRegisterUser();

    await register.execute(userDto);

    const registeredUser = inMemoryAuthRepository.users[0];

    expect(registeredUser).toBeDefined();
    expect(registeredUser.id).toBeDefined();
    expect(registeredUser.email).toBe(userDto.email);
    expect(registeredUser.password).toBe('hashed_password');
    expect(hashService.hash).toHaveBeenCalledWith('password123');
  });

  it('should not register a user with an existing email', async () => {
    const userDto = MakeRegisterUser();

    await register.execute(userDto);

    await expect(register.execute(userDto)).rejects.toThrow('There is already a user with this email!');
  });

  it('should not register a user with an existing username', async () => {
    const firstUser = MakeRegisterUser({
      username: 'testuser',
      email: 'test@example.com'
    });
    await register.execute(firstUser);

    const secondUser = MakeRegisterUser({
      username: 'testuser',
      email: 'different@email.com'
    });

    await expect(register.execute(secondUser)).rejects.toThrow('There is already a user with this username!');
  });
});