import { Injectable } from '@nestjs/common';
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  DeleteTaskResponse,
} from './dto/tasks.dto';
import { v4 as uuid } from 'uuid';
import { Task } from './types/task.type';
import { TaskNotFoundException } from './exceptions/task-not-found.exception';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(task: CreateTaskRequest): Task {
    const id = uuid();
    this.tasks.push({ ...task, id });
    return { ...task, id };
  }

  deleteTask({ id }: DeleteTaskRequest): DeleteTaskResponse {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    return { id };
  }

  updateTask({ id, title, description }: Task): Task {
    const task = this.tasks.find((task: Task) => task.id === id);
    if (!task) throw new TaskNotFoundException();
    task.title = title;
    task.description = description;
    return task;
  }
}
