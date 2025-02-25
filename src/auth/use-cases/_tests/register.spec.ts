import { InMemoryAuthRepository } from "@test/repositories/InMemoryAuth.repository";
import { Register } from "../Register";
import { HashServiceProtocol } from "../../infra/adapters/hash/hash.service";
import { MakeRegisterUser } from "@test/factories/Auth.factory";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('Register user', () => {
  let inMemoryAuthRepository: InMemoryAuthRepository;
  let register: Register;
  let hashService: HashServiceProtocol;

  beforeEach(() => {
    hashService = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn().mockResolvedValue(true)
    };
    inMemoryAuthRepository = new InMemoryAuthRepository(hashService);
    register = new Register(inMemoryAuthRepository, hashService);
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

    await expect(register.execute(userDto)).rejects.toThrow(
      new HttpException('There is already a user with this email!', HttpStatus.CONFLICT)
    );
  });
});