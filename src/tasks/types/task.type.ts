import { CreateTaskRequest } from '../dto/tasks.dto';

export type Task = CreateTaskRequest & { id: string };
