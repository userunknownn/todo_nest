import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/tasks (GET)', () => {
    it('/tasks (GET) success without tasks', () => {
      return request(app.getHttpServer()).get('/tasks').expect(200).expect([]);
    });

    it('/tasks (GET) success with tasks', async () => {
      const response = await request(app.getHttpServer()).post('/tasks').send({
        title: 'test',
        description: 'test',
      });

      return request(app.getHttpServer())
        .get('/tasks')
        .expect(200)
        .expect([response.body]);
    });
  });

  describe('/tasks (POST)', () => {
    it('/tasks (POST) success', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'test', description: 'test' })
        .expect(201);

      expect(response.body).toStrictEqual({
        title: 'test',
        description: 'test',
        id: response.body.id,
      });
    });

    it('/tasks (POST) fail should not be empty', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send({ title: '', description: '' })
        .expect(400)
        .expect({
          message: [
            'title should not be empty',
            'description should not be empty',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('/tasks (POST) fail must be a string', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 1, description: 1 })
        .expect(400)
        .expect({
          message: ['title must be a string', 'description must be a string'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });

  describe('/tasks/:id (DELETE)', () => {
    it('/tasks/:id (DELETE) success', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'test', description: 'test' });

      await request(app.getHttpServer())
        .delete(`/tasks/${response.body.id}`)
        .expect(200)
        .expect({ id: response.body.id });

      return request(app.getHttpServer()).get('/tasks').expect(200).expect([]);
    });
  });

  describe('/tasks/:id (PATCH)', () => {
    it('/tasks/:id (PATCH) success', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'test', description: 'test' });

      const patchResponse = await request(app.getHttpServer())
        .patch(`/tasks/${response.body.id}`)
        .send({ title: 'anotherTitle', description: 'test' })
        .expect(200);

      expect(patchResponse.body).toStrictEqual({
        title: 'anotherTitle',
        description: 'test',
        id: response.body.id,
      });
    });

    it('/tasks/:id (PATCH) fail when there is no task with that id', async () => {
      return request(app.getHttpServer())
        .patch('/tasks/someId')
        .send({ title: 'anotherTitle', description: 'test' })
        .expect(404)
        .expect({
          message: 'Task not found',
          statusCode: 404,
        });
    });
  });
});
