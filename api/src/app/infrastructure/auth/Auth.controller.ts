import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUsuáriosRepository } from '../repositories/UsuáriosRepository';
import { RegistrarUsuárioCaso } from '../../casos-de-uso/RegistrarUsuario.caso';

class RegisterRequest {
  email: string;
  senha: string;
}

@Controller()
export class AuthController {
  constructor(
    @Inject('IUsuáriosRepository')
    private readonly usuáriosRepository: IUsuáriosRepository,
  ) {}

  @Post('/auth/registrar')
  async login(@Body('usuario') body: RegisterRequest) {
    const registrarUsuárioCaso = new RegistrarUsuárioCaso(
      this.usuáriosRepository,
    );
    return registrarUsuárioCaso.executar({
      email: body.email,
      senha: body.senha,
    });
  }
}
