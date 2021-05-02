import { PrismaService } from './Prisma.service';
import { gerarIdentificadorÚnico } from '../../../shared/gerarIdentificadorUnico';
import { criptografarSenha } from '../../../shared/criptografiaSenha';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { Usuário } from '../../dominios/Usuario';

export enum TipoDeChaveCredencial {
  EMAIL = 'EMAIL',
}

export interface IUsuáriosRepository {
  emailExiste(email: string): Promise<boolean>;

  criarComEmailSenha(params: {
    senha: string;
    email: string;
  }): Promise<Usuário>;
}

@Injectable()
export class UsuáriosRepository implements IUsuáriosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async emailExiste(email: string): Promise<boolean> {
    const credencial = await this.prisma.credencial.findFirst({
      where: {
        chave_de_busca: email,
        tipo_de_chave: TipoDeChaveCredencial.EMAIL,
      },
    });
    return !!credencial;
  }

  async criarComEmailSenha(params: {
    senha: string;
    email: string;
  }): Promise<Usuário> {
    const usuárioNovo = await this.prisma.usuario.create({
      data: {
        uuid: gerarIdentificadorÚnico(),
        credenciais: {
          create: {
            chave_de_busca: params.email,
            tipo_de_chave: TipoDeChaveCredencial.EMAIL,
            valor_crypto: await criptografarSenha(params.senha),
          },
        },
      },
    });
    return plainToClass(Usuário, {
      email: params.email,
      uuid: usuárioNovo.uuid,
    });
  }
}
