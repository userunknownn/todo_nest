import { Injectable, Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Injectable()
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  getTasks() {
    return this.service.getTasks();
  }
}
