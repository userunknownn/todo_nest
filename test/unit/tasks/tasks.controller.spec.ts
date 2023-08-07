import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../../../src/tasks/tasks.controller';
import { TasksService } from '../../../src/tasks/tasks.service';
import { taskMock } from './tasks.mock';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = app.get<TasksController>(TasksController);
    service = app.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    let getTasksMock: jest.SpyInstance;

    beforeEach(() => {
      getTasksMock = jest.spyOn(service, 'getTasks');
    });

    it('should call tasksService getTasks method', () => {
      controller.getTasks();

      expect(getTasksMock).toBeCalled();
    });
  });

  describe('createTask', () => {
    let createTaskMock: jest.SpyInstance;

    beforeEach(() => {
      createTaskMock = jest.spyOn(service, 'createTask');
    });

    it('should call tasksService createTask with the correct value', async () => {
      controller.createTask(taskMock);

      expect(createTaskMock).toBeCalledWith(taskMock);
    });
  });

  describe('deleteTask', () => {
    let deleteTaskMock: jest.SpyInstance;
    beforeEach(() => {
      deleteTaskMock = jest.spyOn(service, 'deleteTask');
    });

    it('should call tasksService deleteTask with the correct value', async () => {
      controller.deleteTask({ id: 'id' });

      expect(deleteTaskMock).toBeCalledWith('id');
    });
  });
});
