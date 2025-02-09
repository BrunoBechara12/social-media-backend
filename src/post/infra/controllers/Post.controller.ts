import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthTokenGuard } from 'src/auth/infra/adapters/guards/auth-token.guard';
import { CreatePostDto } from '../dtos/CreatePost.dto';
import { Create } from 'src/post/use-cases/Create';
import { GetAll } from 'src/post/use-cases/GetAll';
import { Post as post } from 'src/post/domain/entities/Post.entity';
import { GetById } from 'src/post/use-cases/GetById';
import { GetAllByAuthor } from 'src/post/use-cases/GetAllByAuthor';
import { Delete as DeletePost } from 'src/post/use-cases/Delete';
import { UpdatePostDto } from '../dtos/UpdatePost.dto';
import { Update } from 'src/post/use-cases/Update';

@Controller('post')
export class PostController {
  constructor(
    private getAllPosts: GetAll,
    private getById: GetById,
    private getAllByAuthor: GetAllByAuthor,
    private createPost: Create,
    private deletePost: DeletePost,
    private update: Update
){}

  @UseGuards(AuthTokenGuard)
  @Get('getAll')
  async GetAll(): Promise<post[]> {
    const posts = await this.getAllPosts.execute();

    return posts
  } 

  @UseGuards(AuthTokenGuard)
  @Get('getById/:postId')
  async GetById(@Param('postId', ParseIntPipe) postId: number): Promise<post> {
    const post = await this.getById.execute(postId);

    return post
  } 

  @UseGuards(AuthTokenGuard)
  @Get('getAllByAuthor/:authorId')
  async GetAllByAuthor(@Param('authorId', ParseIntPipe) authorId: number): Promise<post[] | null> {
    const posts = await this.getAllByAuthor.execute(authorId);

    return posts
  } 

  @UseGuards(AuthTokenGuard)
  @Post('create')
  async Create(@Body() request: CreatePostDto): Promise<void> {
    await this.createPost.execute(request);
  } 

  @UseGuards(AuthTokenGuard)
  @Put('update')
  async Update(@Body() request: UpdatePostDto): Promise<void> {
    await this.update.execute(request);
  } 

  @UseGuards(AuthTokenGuard)
  @Delete('delete/:postId')
  async Delete(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.deletePost.execute(postId);
  } 
}
