import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/infra/adapters/config/jwt.config';
import { GetAllByPost } from './use-cases/GetAllByPost';
import { Like } from './use-cases/Like';
import { Unlike } from './use-cases/Unlike';
import { LikeController } from './infra/controllers/Like.controller';
import { LikeRepository } from './use-cases/ports/Like.repository';
import { PrismaLikeRepository } from './infra/repositories/PrismaLike.repository';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forFeature(jwtConfig) 
  ],
  controllers: [LikeController],
  providers: [
    Like,
    Unlike,
    GetAllByPost,
    {
      provide: LikeRepository,
      useClass: PrismaLikeRepository
    }
  ],
  exports: [LikeRepository]
})
export class LikeModule {}
