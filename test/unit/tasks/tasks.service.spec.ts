import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../../src/tasks/tasks.service';
import { taskMock } from './tasks.mock';
import { v4 as uuid } from 'uuid';
import { TasksRepository } from '../../../src/tasks/tasks.repository';
import { PrismaClient } from '@prisma/client';
import { TaskNotFoundException } from '../../../src/tasks/exceptions/task-not-found.exception';

jest.mock('uuid');

describe('TasksService', () => {
  let service: TasksService;
  let repository: TasksRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        TasksService,
        TasksRepository,
        {
          provide: TasksRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest
              .fn()
              .mockResolvedValue({ ...taskMock, id: 'mocked-uuid' }),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
        PrismaClient,
      ],
    }).compile();

    service = app.get<TasksService>(TasksService);
    repository = app.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks', () => {
    it('should return get the tasks list', async () => {
      const tasks = await service.getTasks();

      expect(tasks).toStrictEqual([]);
    });
  });

  describe('createTask', () => {
    beforeEach(() => {
      uuid.mockReturnValue('mocked-uuid');

      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValueOnce([{ ...taskMock, id: 'mocked-uuid' }]);
    });

    it('should create a task', async () => {
      await service.createTask(taskMock);
      const tasks = await service.getTasks();

      expect(tasks).toStrictEqual([{ ...taskMock, id: 'mocked-uuid' }]);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      await service.deleteTask({ id: 'id' });

      expect(repository.delete).toBeCalled();
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      await service.updateTask({
        id: 'id',
        title: 'new title',
        description: 'new description',
      });

      expect(repository.update).toBeCalledWith({
        title: 'new title',
        description: 'new description',
        id: 'id',
      });
    });

    it('should throw an error if the task does not exists', () => {
      jest
        .spyOn(repository, 'update')
        .mockRejectedValueOnce(new TaskNotFoundException());
      expect(
        async () =>
          await service.updateTask({
            id: 'invalid-id',
            title: 'new title',
            description: 'new description',
          }),
      ).rejects.toThrowError('Task not found');
    });
  });
});
