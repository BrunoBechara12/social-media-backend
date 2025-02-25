import { Comment } from "@prisma/client";
import { CreateCommentDto } from "src/comment/infra/dtos/CreateComment.dto";
import { CreateReplyDto } from "src/comment/infra/dtos/CreateReply.dto";
import { UpdateCommentDto } from "src/comment/infra/dtos/UpdateComment.dto";

export abstract class CommentRepository {
  abstract create(data: CreateCommentDto): Promise<void>;
  abstract createReply(data: CreateReplyDto): Promise<void>;
  abstract update(data: UpdateCommentDto): Promise<void>;
  abstract getAllByPost(postId: number): Promise<Comment[]>;
  abstract delete(id: number): Promise<void>;
}