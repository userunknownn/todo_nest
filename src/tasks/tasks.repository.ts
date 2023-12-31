import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TaskStatus } from './enums/task-status.enum';
import { Task } from './types/task.type';

@Injectable()
export class TasksRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<Task[]> {
    return await this.prismaClient.task.findMany();
  }

  async create(task: Task): Promise<Task> {
    return await this.prismaClient.task.create({
      data: { ...task, status: TaskStatus.IN_PROGRESS },
    });
  }

  async delete(id: string): Promise<Task> {
    return await this.prismaClient.task.delete({ where: { id } });
  }

  async update({ id, title, description }: Task): Promise<Task> {
    const task = await this.prismaClient.task.update({
      where: { id },
      data: { title, description },
    });
    return task;
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.prismaClient.task.update({
      where: { id },
      data: { status: status },
    });
    return task;
  }
}
