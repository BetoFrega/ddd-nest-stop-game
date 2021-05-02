import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Registrar usuário', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Registrar usuário', () => {
    expect.assertions(1);
    return request(app.getHttpServer())
      .post('auth/registrar')
      .send({
        email: 'fulane.silveira@gmail.com',
        senha: 'senha de fulane',
      })
      .expect(200)
      .expect((res) => {
        return expect(JSON.parse(res.body)).toEqual(
          expect.objectContaining({
            email: 'fulane.silveira@gmail.com',
          }),
        );
      });
  });
});
