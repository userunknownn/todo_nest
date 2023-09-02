import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { Task } from '../types/task.type';

export class CreateTaskRequest {
  @ApiProperty({
    description: 'task title',
    example: 'go to the supermarket',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'task description',
    example: 'i need to buy a new phone',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

export class DeleteTaskRequest {
  @ApiProperty({
    description: 'task identifier',
    example: '598e8b77-5003-4fc0-aba9-f0fa7f4a3183',
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
export class UpdateTaskRequest {
  @ApiProperty({
    description: 'task identifier',
    example: '598e8b77-5003-4fc0-aba9-f0fa7f4a3183',
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}

export class UpdateTaskPatchRequest {
  @ApiProperty({
    description: 'task title',
    example: 'do the homework',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'task description',
    example: 'Math exercises from page 40 to 45',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

export class UpdateTaskStatusRequest {
  @ApiProperty({
    description: 'task current status',
    example: 'In progress',
  })
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
