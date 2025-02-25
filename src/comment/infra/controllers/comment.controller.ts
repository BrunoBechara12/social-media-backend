import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AuthTokenGuard } from 'src/auth/infra/adapters/guards/auth-token.guard';
import { Create } from 'src/comment/use-cases/Create';
import { CreateReply } from 'src/comment/use-cases/CreateReply';
import { Update } from 'src/comment/use-cases/Update';
import { CreateCommentDto } from '../dtos/CreateComment.dto';
import { CreateReplyDto } from '../dtos/CreateReply.dto';
import { UpdateCommentDto } from '../dtos/UpdateComment.dto';
import { Delete as DeleteComment } from 'src/comment/use-cases/Delete';
import { Comment } from '@prisma/client';
import { GetAllByPost } from 'src/comment/use-cases/GetAllByPost';

@Controller('comment')
export class CommentController {
  constructor(
    private create: Create,
    private createReply: CreateReply,
    private update: Update,
    private getAllByPost: GetAllByPost,
    private deleteComment: DeleteComment,
){}

  @UseGuards(AuthTokenGuard)
  @Post('createComment')
  async Create(@Body() request: CreateCommentDto): Promise<void> {
    await this.create.execute(request);
  } 

  @UseGuards(AuthTokenGuard)
  @Post('createReply')
  async CreateReply(@Body() request: CreateReplyDto): Promise<void> {
    await this.createReply.execute(request);
  } 

  @UseGuards(AuthTokenGuard)
  @Put('updateComment')
  async Update(@Body() request: UpdateCommentDto): Promise<void> {
    await this.update.execute(request);
  } 

  @UseGuards(AuthTokenGuard)
  @Get('getAllByPost/:postId')
  async GetAllByPost(@Param('postId', ParseIntPipe) postId: number): Promise<Comment[]> {
    const comments = this.getAllByPost.execute(postId);

    return comments
  } 

  @UseGuards(AuthTokenGuard)
  @Delete('delete/:commentId')
  async Delete(@Param('commentId', ParseIntPipe) commentId: number): Promise<void> {
    await this.deleteComment.execute(commentId);
  } 
}
