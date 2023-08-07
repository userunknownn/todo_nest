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
      await request(app.getHttpServer()).post('/tasks').send({
        title: 'test',
        description: 'test',
      });

      return request(app.getHttpServer())
        .get('/tasks')
        .expect(200)
        .expect([{ title: 'test', description: 'test' }]);
    });
  });

  describe('/tasks (POST)', () => {
    it('/tasks (POST) success', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'test', description: 'test' })
        .expect(201)
        .expect({ title: 'test', description: 'test' });
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
});
