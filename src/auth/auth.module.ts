import { Global, Module } from '@nestjs/common';
import { BcryptService } from './infra/adapters/hash/bcrypt.hash.service';
import { HashServiceProtocol } from './infra/adapters/hash/hash.service';
import { AuthController } from './infra/controllers/auth.controller';
import { PrismaService } from 'src/infra/database/database.service';
import { Register } from './use-cases/Register';
import { Login } from './use-cases/Login';
import { PrismaAuthRepository } from './infra/repositories/PrismaAuth.repository';
import { AuthRepository } from './use-cases/ports/Auth.repository';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './infra/adapters/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthTokenGuard } from './infra/adapters/guards/auth-token.guard';
import { UserModule } from '@src/user/user.module';

@Global()
@Module({
  imports: [
    ConfigModule, 
    DatabaseModule, 
    UserModule,
    ConfigModule.forFeature(jwtConfig), 
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  controllers: [AuthController],
  providers: [
    AuthTokenGuard,
    Register,
    Login,
    {
      provide: HashServiceProtocol,
      useClass: BcryptService,
    },
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
  ],
  exports: [HashServiceProtocol, AuthRepository, JwtModule, AuthTokenGuard],
})

export class AuthModule {}
