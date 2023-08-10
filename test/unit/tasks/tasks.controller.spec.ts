import { Test, TestingModule } from '@nestjs/testing';
import { TasksRepository } from '../../../src/tasks/tasks.repository';
import { TasksController } from '../../../src/tasks/tasks.controller';
import { TasksService } from '../../../src/tasks/tasks.service';
import { taskMock } from './tasks.mock';
import { PrismaClient } from '@prisma/client';
import { TaskNotFoundException } from '../../../src/tasks/exceptions/task-not-found.exception';
import { TaskStatus } from '../../../src/tasks/enums/task-status.enum';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: TasksService,
          useValue: {
            getTasks: jest.fn(),
            createTask: jest.fn().mockResolvedValue({ ...taskMock, id: 'id' }),
            deleteTask: jest.fn(),
            updateTask: jest.fn(),
            updateTaskStatus: jest.fn(),
          },
        },
        TasksRepository,
        PrismaClient,
      ],
    }).compile();

    controller = app.get<TasksController>(TasksController);
    service = app.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    it('should call tasksService getTasks method', () => {
      controller.getTasks();

      expect(service.getTasks).toBeCalled();
    });
  });

  describe('createTask', () => {
    it('should call tasksService createTask with the correct value', async () => {
      controller.createTask(taskMock);

      expect(service.createTask).toBeCalledWith(taskMock);
    });
  });

  describe('deleteTask', () => {
    it('should call tasksService deleteTask with the correct value', async () => {
      controller.deleteTask({ id: 'id' });

      expect(service.deleteTask).toBeCalledWith({ id: 'id' });
    });
  });

  describe('updateTask', () => {
    it('should call tasksService updateTask with the correct value', async () => {
      const task = await controller.createTask(taskMock);
      controller.updateTask(
        { id: task.id },
        { ...taskMock, title: 'new title' },
      );

      expect(service.updateTask).toBeCalledWith({
        id: task.id,
        ...taskMock,
        title: 'new title',
      });
    });

    it('should throw an error if the task is not found', async () => {
      jest
        .spyOn(service, 'updateTask')
        .mockRejectedValue(new TaskNotFoundException());

      expect(
        async () =>
          await controller.updateTask(
            { id: 'not-found' },
            { ...taskMock, title: 'new title' },
          ),
      ).rejects.toThrowError('Task not found');
    });
  });

  describe('updateTaskStatus', () => {
    it('should call tasks service updateTaskStatus', async () => {
      const task = await controller.createTask(taskMock);
      controller.updateTaskStatus({ id: task.id }, { status: TaskStatus.DONE });

      expect(service.updateTaskStatus).toBeCalledWith({
        id: task.id,
        status: TaskStatus.DONE,
      });
    });

    it('should throw an error if the task is not found', async () => {
      jest
        .spyOn(service, 'updateTaskStatus')
        .mockRejectedValue(new TaskNotFoundException());

      expect(
        async () =>
          await controller.updateTaskStatus(
            { id: 'not-found' },
            { status: TaskStatus.DONE },
          ),
      ).rejects.toThrow('Task not found');
    });
  });
});
