import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { AuthRepository } from "../../auth/use-cases/ports/Auth.repository";
import { LoginUserDto } from "src/auth/infra/dtos/LoginUser.dto";
import { HashServiceProtocol } from "../infra/adapters/hash/hash.service";
import jwtConfig from "../infra/adapters/config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class Login {
  constructor(
    private authRepository: AuthRepository, 
    private hashService: HashServiceProtocol,
    
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
  ) {}

  async execute(request: LoginUserDto): Promise<any> {
    const user = await this.authRepository.login(request);

    if(!user){
      throw new HttpException("Falha ao realizar o login", HttpStatus.UNAUTHORIZED)
    }

    const passwordIsValid = await this.hashService.compare(request.password, user.password)

    if(!passwordIsValid){
      throw new HttpException("Falha ao realizar o login", HttpStatus.UNAUTHORIZED)
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer
      }
    )

    return {
      id: user.id,
      name: user.username,
      token: token
    }
  }
}