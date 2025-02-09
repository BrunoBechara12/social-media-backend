import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/infra/adapters/config/jwt.config';
import { PostRepository } from './use-cases/ports/Post.repository';
import { PrismaPostRepository } from './infra/repositories/PrismaPost.repository';
import { PostController } from './infra/controllers/Post.controller';
import { Create } from './use-cases/Create';
import { GetAll } from './use-cases/GetAll';
import { GetById } from './use-cases/GetById';
import { GetAllByAuthor } from './use-cases/GetAllByAuthor';
import { Delete } from './use-cases/Delete';
import { Update } from './use-cases/Update';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigModule.forFeature(jwtConfig) 
  ],
  controllers: [PostController],
  providers: [
    Update,
    Delete,
    GetById,
    GetAll,
    GetAllByAuthor,
    Create,
    {
      provide: PostRepository,
      useClass: PrismaPostRepository
    }
  ],
  exports: [PostRepository]
})
export class PostModule {}
