import { Comment } from "@prisma/client";
import { CommentRepository } from "src/comment/use-cases/ports/Comment.repository";
import { CreateCommentDto } from "src/comment/infra/dtos/CreateComment.dto";
import { UpdateCommentDto } from "src/comment/infra/dtos/UpdateComment.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { User } from "@prisma/client";
import { Post } from "@prisma/client";
import { CreateReplyDto } from "src/comment/infra/dtos/CreateReply.dto";

export class InMemoryCommentRepository implements CommentRepository {
  public comments: Comment[] = [];
  public users: User[] = [];
  public posts: Post[] = [];

  async create(comment: CreateCommentDto): Promise<void> {

    const newComment: Comment = {
      id: 1,
      content: comment.content,
      authorId: comment.authorId,
      postId: comment.postId,
      commentId: null,
      createdAt: new Date(),
      updatedAt: null
    };

    this.comments.push(newComment);
  }

  async createReply(comment: CreateReplyDto): Promise<void> {
    const parentComment = this.comments.find(c => c.id === comment.commentId);
    
    if (!parentComment) {
      throw new HttpException('Comentário não encontrado', HttpStatus.NOT_FOUND);
    }

    const newComment: Comment = {
      id: this.comments.length + 1,
      content: comment.content,
      authorId: comment.authorId,
      postId: comment.postId,
      commentId: comment.commentId!,
      createdAt: new Date(),
      updatedAt: null
    };

    this.comments.push(newComment);
  }

  async update(commentUpdate: UpdateCommentDto): Promise<void> {
    const commentIndex = this.comments.findIndex(c => c.id === commentUpdate.commentId);

    if (commentIndex === -1) {
      throw new HttpException("Comentário não encontrado", HttpStatus.NOT_FOUND);
    }

    this.comments[commentIndex] = {
      ...this.comments[commentIndex],
      content: commentUpdate.content || this.comments[commentIndex].content,
      updatedAt: new Date()
    };
  }

  async getAllByPost(postId: number): Promise<Comment[]> {
    const comments = this.comments.filter(c => c.postId === postId);

    return comments;
  }

  async delete(id: number): Promise<void> {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }

}
