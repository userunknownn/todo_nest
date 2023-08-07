import { IsNotEmpty, IsString } from 'class-validator';

export class TasksRequest {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
