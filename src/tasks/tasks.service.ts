import { Injectable } from '@nestjs/common';
import { TasksRequest } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  private tasks = [];

  getTasks() {
    return this.tasks;
  }

  createTask(task: TasksRequest) {
    this.tasks.push(task);
    return task;
  }
}
