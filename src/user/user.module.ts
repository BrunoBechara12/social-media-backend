import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './infra/repositories/PrismaUser.repository';
import { UpdateProfile } from './use-cases/UpdateProfile';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserController } from './infra/controllers/User.controller';
import { UserRepository } from './use-cases/ports/User.repository';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/infra/adapters/config/jwt.config';
import { GetById } from './use-cases/GetById';
import { UpdateCredentials } from './use-cases/UpdateCredentials';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forFeature(jwtConfig) 
  ],
  controllers: [UserController],
  providers: [
    GetById,
    UpdateProfile,
    UpdateCredentials,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [UserRepository]
})
export class UserModule {}
