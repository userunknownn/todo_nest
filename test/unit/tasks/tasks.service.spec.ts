import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../../src/tasks/tasks.service';
import { taskMock } from './tasks.mock';
import { v4 as uuid } from 'uuid';

jest.mock('uuid');

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [TasksService],
    }).compile();

    service = app.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    it('should return get the tasks list', () => {
      const tasks = service.getTasks();

      expect(tasks).toStrictEqual([]);
    });
  });

  describe('createTask', () => {
    it('should create a task', () => {
      uuid.mockReturnValue('mocked-uuid');

      service.createTask(taskMock);
      const tasks = service.getTasks();

      expect(tasks).toStrictEqual([{ ...taskMock, id: 'mocked-uuid' }]);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const task = service.createTask(taskMock);
      service.deleteTask(task.id);
      const tasks = service.getTasks();

      expect(tasks).toStrictEqual([]);
    });
  });
});
