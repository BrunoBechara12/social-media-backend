import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthTokenGuard } from 'src/auth/infra/adapters/guards/auth-token.guard';
import { GetAllByPost } from 'src/like/use-cases/GetAllByPost';
import { Like } from 'src/like/use-cases/Like';
import { Unlike } from 'src/like/use-cases/Unlike';
import { ToggleLikeDto } from '../dtos/ToggleLike.dto';

@Controller('like')
export class LikeController {
  constructor(
    private like: Like,
    private unlike: Unlike,
    private getAllByPost: GetAllByPost,
){}

  @UseGuards(AuthTokenGuard)
  @Post('like')
  async Like(@Body() request: ToggleLikeDto): Promise<void> {
    await this.like.execute(request);
  } 

  @UseGuards(AuthTokenGuard)
  @Post('unlike')
  async Unlike(@Body() request: ToggleLikeDto): Promise<void> {
    await this.unlike.execute(request);
  } 

  @UseGuards(AuthTokenGuard)
  @Get('getAllByPost/:postId')
  async GetAll(@Param('postId', ParseIntPipe) postId: number): Promise<number> {
    const likes = await this.getAllByPost.execute(postId);

    return likes
  } 
}
