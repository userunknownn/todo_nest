import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../../src/tasks/tasks.service';
import { taskMock } from './tasks.mock';

describe('TasksController', () => {
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
    it('should create a task', async () => {
      service.createTask(taskMock);
      const tasks = service.getTasks();

      expect(tasks).toStrictEqual([taskMock]);
    });
  });
});
