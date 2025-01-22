import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './infra/database/database.service';

@Controller('app')
export class AppController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async getTeste() {
    return this
  }
}
