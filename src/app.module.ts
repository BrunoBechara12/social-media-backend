import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
