import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCommentDto {
   @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    content: string;
  
    @IsNotEmpty()
    @IsNumber()
    commentId: number;

    @IsOptional()
    @IsDate()
    updatedAt: Date;
}
