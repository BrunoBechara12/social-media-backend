import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InMemoryAuthRepository } from '@test/repositories/InMemoryAuth.repository';
import { Login } from '../Login';
import { HashServiceProtocol } from '../../infra/adapters/hash/hash.service';
import { MakeLoginUser, MakeRegisterUser } from '@test/factories/Auth.factory';

describe('Login user', () => {
  let login: Login;
  let authRepository: InMemoryAuthRepository;
  let hashService: HashServiceProtocol;
  let jwtService: JwtService;

  const mockJwtConfig = {
    secret: 'test-secret',
    jwtTtl: '1h',
    audience: 'test-audience',
    issuer: 'test-issuer'
  };

  beforeEach(async () => {
    hashService = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn().mockResolvedValue(true)
    };
    authRepository = new InMemoryAuthRepository(hashService);
    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mock_token')
    } as any;

    login = new Login(
      authRepository,
      hashService,
      mockJwtConfig,
      jwtService
    );
  });

  it('Should be able to login with valid credentials', async () => {
    const registerUserDto = MakeRegisterUser();
    registerUserDto.password = await hashService.hash(registerUserDto.password);
    await authRepository.register(registerUserDto);

    const loginUserDto = MakeLoginUser();

    const result = await login.execute(loginUserDto);

    expect(result).toBeTruthy();
    expect(result.token).toBe('mock_token');
    expect(result.id).toBe(1);
    expect(result.name).toBe('testuser');
    expect(hashService.compare).toHaveBeenCalledWith('password123', 'hashed_password');
  });

  it('Should not be able to login with non-existent user', async () => {
    const loginUserDto = MakeLoginUser({ email: 'nonexistent@example.com' });

    await expect(login.execute(loginUserDto)).rejects.toThrow(new HttpException('User not found', HttpStatus.NOT_FOUND));
  });

  it('Should not be able to login with invalid password', async () => {
    const registerUserDto = MakeRegisterUser();
    registerUserDto.password = await hashService.hash(registerUserDto.password);
    await authRepository.register(registerUserDto);

    const loginUserDto = MakeLoginUser({ password: 'wrongpassword' });

    hashService.compare = jest.fn().mockResolvedValue(false);

    await expect(login.execute(loginUserDto)).rejects.toThrow(new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED));
  });

  it('Should generate JWT token with correct payload', async () => {
    const registerUserDto = MakeRegisterUser();
    registerUserDto.password = await hashService.hash(registerUserDto.password);
    await authRepository.register(registerUserDto);

    const loginUserDto = MakeLoginUser();

    await login.execute(loginUserDto);

    expect(jwtService.signAsync).toHaveBeenCalledWith(
      {
        sub: 1,
        email: 'test@example.com'
      },
      {
        secret: mockJwtConfig.secret,
        expiresIn: mockJwtConfig.jwtTtl,
        audience: mockJwtConfig.audience,
        issuer: mockJwtConfig.issuer
      }
    );
  });

  it('Should validate the password hash correctly', async () => {
    const registerUserDto = MakeRegisterUser();
    registerUserDto.password = await hashService.hash(registerUserDto.password);
    
    await authRepository.register(registerUserDto);

    const loginUserDto = MakeLoginUser();

    hashService.compare = jest.fn().mockResolvedValue(true);

    const result = await login.execute(loginUserDto);

    expect(result).toBeTruthy();
    expect(hashService.compare).toHaveBeenCalledWith('password123', 'hashed_password');
  });
});
