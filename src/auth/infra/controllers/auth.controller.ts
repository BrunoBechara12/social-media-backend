import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { Register } from 'src/auth/use-cases/Register';
import { Login } from 'src/auth/use-cases/Login';
import { RegisterUserDto } from '../dtos/RegisterUser.dto';
import { LoginUserDto } from '../dtos/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private register: Register,
    private login: Login,
  ) {}

  @Post('register')
  async registerUser(@Body() request: RegisterUserDto) {
    await this.register.execute(request);
  }

  @Post('login')
  async loginUser(@Body() request: LoginUserDto) {
    const login = await this.login.execute(request);

    return login
  }

}
