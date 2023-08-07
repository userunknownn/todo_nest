import {
  Injectable,
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
} from './dto/tasks.dto';
@Injectable()
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  getTasks() {
    return this.service.getTasks();
  }

  @Post()
  createTask(@Body() request: CreateTaskRequest): CreateTaskResponse {
    return this.service.createTask(request);
  }

  @Delete(':id')
  deleteTask(@Param() request: DeleteTaskRequest): DeleteTaskResponse {
    return this.service.deleteTask(request);
  }
}
