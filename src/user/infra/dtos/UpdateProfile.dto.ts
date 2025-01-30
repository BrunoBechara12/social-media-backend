import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
