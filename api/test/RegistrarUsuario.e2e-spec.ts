import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { IUsuáriosRepository } from '../src/app/infrastructure/repositories/UsuáriosRepository';
import { PrismaService } from '../src/app/infrastructure/repositories/Prisma.service';

describe('Registrar usuário', () => {
  let app: INestApplication;
  let userRepository: IUsuáriosRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<IUsuáriosRepository>(
      'IUsuáriosRepository',
    );
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
    await prismaService.credencial.deleteMany({}).then(() => {
      prismaService.usuario.deleteMany({});
    });
  });

  afterEach(async () => {
    await prismaService.credencial.deleteMany({}).then(() => {
      prismaService.usuario.deleteMany({});
    });
  });

  it('Retorna usuário quando registra', async () => {
    expect.assertions(1);
    return request(app.getHttpServer())
      .post('/auth/cadastro')
      .send({
        email: 'fulane.silveira@gmail.com',
        senha: 'senha de fulane',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            email: 'fulane.silveira@gmail.com',
            uuid: expect.stringMatching(/\S+/),
          }),
        );
      });
  });

  it('Salva usuário no banco', () => {
    expect.assertions(1);
    return request(app.getHttpServer())
      .post('/auth/cadastro')
      .send({
        email: 'fulane.silveira@gmail.com',
        senha: 'senha de fulane',
      })
      .expect(201)
      .expect(async (res) => {
        const savedUser = await userRepository.emailExiste(res.body.email);
        return expect(savedUser).toEqual(true);
      });
  });

  it('Retorna JWT quando registra', async () => {
    expect.assertions(1);
    return request(app.getHttpServer())
      .post('/auth/cadastro')
      .send({
        email: 'fulane.silveira@gmail.com',
        senha: 'senha de fulane',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            jwt: expect.stringMatching(/\S+/),
          }),
        );
      });
  });
});
