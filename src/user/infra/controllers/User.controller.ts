import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthTokenGuard } from 'src/auth/infra/adapters/guards/auth-token.guard';
import { UpdateProfileDto } from '../dtos/UpdateProfile.dto';
import { UpdateProfile } from 'src/user/use-cases/UpdateProfile';
import { GetById } from 'src/user/use-cases/GetById';
import { User } from 'src/user/domain/entities/User.entity';
import { UpdateCredentials } from 'src/user/use-cases/UpdateCredentials';
import { UpdateCredentialsDto } from '../dtos/UpdateCredentials.dto';

@Controller('user')
export class UserController {
  constructor(
    private updateProfile: UpdateProfile, 
    private updateCredentials: UpdateCredentials, 
    private getById: GetById
){}

  @UseGuards(AuthTokenGuard)
  @Get('getById/:userId')
  async GetById(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    const user = await this.getById.execute(userId);

    return user
  }

  @UseGuards(AuthTokenGuard)
  @Put('updateProfile')
  async UpdateProfile(@Body() request: UpdateProfileDto): Promise<void> {
    await this.updateProfile.execute(request);
  }

  @UseGuards(AuthTokenGuard)
  @Put('updateCredentials')
  async UpdateCredentials(@Body() request: UpdateCredentialsDto): Promise<void> {
    await this.updateCredentials.execute(request);
  }
}
