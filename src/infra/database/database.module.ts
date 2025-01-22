import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database.service';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService],
  exports: [],
})
export class DatabaseModule {}