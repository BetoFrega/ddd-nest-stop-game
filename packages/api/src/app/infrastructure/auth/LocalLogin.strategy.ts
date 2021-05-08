import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUsuáriosRepository } from '../repositories/UsuáriosRepository';

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(
  Strategy,
  'local-login',
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
    const user = await this.usuáriosRepository.validarEmailSenha(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
