import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../../../src/tasks/tasks.controller';
import { TasksService } from '../../../src/tasks/tasks.service';

describe('TasksController', () => {
  let tasksController: TasksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = app.get<TasksController>(TasksController);
  });

  it('should return get a list of tasks', () => {
    expect(tasksController.getTasks()).toStrictEqual([]);
  });
});
