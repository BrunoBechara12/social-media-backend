import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "src/auth/infra/adapters/config/jwt.config";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateReply } from "./use-cases/CreateReply";
import { Create} from "./use-cases/Create";
import { Update } from "./use-cases/Update";
import { GetAllByPost } from "./use-cases/GetAllByPost";
import { CommentRepository } from "./use-cases/ports/Comment.repository";
import { PrismaCommentRepository } from "./infra/repositories/PrismaComment.repository";
import { CommentController } from "./infra/controllers/comment.controller";
import { Delete } from "./use-cases/Delete";


@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forFeature(jwtConfig) 
  ],
  controllers: [CommentController],
  providers: [
    CreateReply,
    Create,
    Update,
    GetAllByPost,
    Delete,
    {
      provide: CommentRepository,
      useClass: PrismaCommentRepository
    }
  ],
  exports: [CommentRepository]
})
export class CommentModule {}
