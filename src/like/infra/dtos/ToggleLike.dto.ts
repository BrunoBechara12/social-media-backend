import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class ToggleLikeDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
