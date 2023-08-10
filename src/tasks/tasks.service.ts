import { Injectable } from '@nestjs/common';
import { CreateTaskRequest, DeleteTaskRequest } from './dto/tasks.dto';
import { v4 as uuid } from 'uuid';
import { Task } from './types/task.type';
import { TaskNotFoundException } from './exceptions/task-not-found.exception';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly repository: TasksRepository) {}

  async getTasks(): Promise<Task[]> {
    return await this.repository.findAll();
  }

  async createTask(task: CreateTaskRequest): Promise<Task> {
    const id = uuid();
    return await this.repository.create({ ...task, id });
  }

  async deleteTask({ id }: DeleteTaskRequest): Promise<Task> {
    return await this.repository.delete(id);
  }

  async updateTask(task: Task): Promise<Task> {
    try {
      return await this.repository.update(task);
    } catch {
      throw new TaskNotFoundException();
    }
  }

  async updateTaskStatus({ id, status }: { id: string; status: TaskStatus }) {
    try {
      return await this.repository.updateStatus(id, status);
    } catch {
      throw new TaskNotFoundException();
    }
  }
}
