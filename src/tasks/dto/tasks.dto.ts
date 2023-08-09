import { IsNotEmpty, IsString } from 'class-validator';
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

export class CreateTaskResponse {
  title: string;
  description: string;
  id: string;
}

export class DeleteTaskResponse {
  title: string;
  description: string;
  id: string;
}

export class UpdateTaskResponse {
  title: string;
  description: string;
  id: string;
}

export class GetTasksResponse extends Array<Task> {}
