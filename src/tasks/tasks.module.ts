import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, PrismaClient],
})
export class TasksModule {}
