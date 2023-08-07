import { Injectable, Controller, Get, Body, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksRequest } from './dto/tasks.dto';
@Injectable()
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  getTasks() {
    return this.service.getTasks();
  }

  @Post()
  createTask(@Body() task: TasksRequest) {
    return this.service.createTask(task);
  }
}
