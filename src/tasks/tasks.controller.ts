import {
  Injectable,
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetTasksResponse,
  UpdateTaskPatchRequest,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from './dto/tasks.dto';

@Injectable()
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  getTasks(): Promise<GetTasksResponse> {
    return this.service.getTasks();
  }

  @Post()
  createTask(@Body() request: CreateTaskRequest): Promise<CreateTaskResponse> {
    return this.service.createTask(request);
  }

  @Delete(':id')
  deleteTask(@Param() request: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    return this.service.deleteTask(request);
  }

  @Patch(':id')
  updateTask(
    @Param() id: UpdateTaskRequest,
    @Body() request: UpdateTaskPatchRequest,
  ): Promise<UpdateTaskResponse> {
    return this.service.updateTask({ ...id, ...request });
  }
}
