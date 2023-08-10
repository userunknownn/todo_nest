import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { Task } from '../types/task.type';

export class CreateTaskRequest {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

export class DeleteTaskRequest {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
export class UpdateTaskRequest {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}

export class UpdateTaskPatchRequest {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

export class UpdateTaskStatusRequest {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}

export class CreateTaskResponse {
  title: string;
  description: string;
  id: string;
  status?: string;
}

export class DeleteTaskResponse {
  title: string;
  description: string;
  id: string;
  status?: string;
}

export class UpdateTaskResponse {
  title: string;
  description: string;
  id: string;
  status?: string;
}

export class GetTasksResponse extends Array<Task> {}
