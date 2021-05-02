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

  it('Retorna usuário quando registra', () => {
    expect.assertions(1);
    return request(app.getHttpServer())
      .post('/auth/registrar')
      .send({
        usuario: {
          email: 'fulane.silveira@gmail.com',
          senha: 'senha de fulane',
        },
      })
      .expect(201)
      .expect((res) => {
        console.log(res.body);
        return expect(res.body).toEqual(
          expect.objectContaining({
            usuario: {
              email: 'fulane.silveira@gmail.com',
            },
          }),
        );
      });
  });
});
