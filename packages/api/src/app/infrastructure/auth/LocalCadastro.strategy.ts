import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUsuáriosRepository } from '../repositories/UsuáriosRepository';
import { RegistrarUsuárioCaso } from '../../casos-de-uso/RegistrarUsuario.caso';

@Injectable()
export class LocalCadastroStrategy extends PassportStrategy(
  Strategy,
  'local-cadastro',
) {
  constructor(
    @Inject('IUsuáriosRepository')
    private usuáriosRepository: IUsuáriosRepository,
  ) {
    super({
      passwordField: 'senha',
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const registrarUsuárioCaso = new RegistrarUsuárioCaso(
      this.usuáriosRepository,
    );
    const usuário = await registrarUsuárioCaso.executar({
      email: username,
      senha: password,
    });
    if (!usuário) {
      throw new UnauthorizedException();
    }
    return usuário;
  }
}
