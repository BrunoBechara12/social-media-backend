import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateReplyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  content: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @IsNumber()
  commentId: number; 
}
