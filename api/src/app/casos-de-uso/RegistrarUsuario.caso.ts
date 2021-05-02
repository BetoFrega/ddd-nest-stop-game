import { IUsuáriosRepository } from '../infrastructure/repositories/UsuáriosRepository';

class RegistrarUsuárioRequest {
  email: string;
  senha: string;
}

export class RegistrarUsuárioCaso {
  constructor(private readonly userRepository: IUsuáriosRepository) {}

  async executar(request: RegistrarUsuárioRequest) {
    const usuárioExiste = await this.userRepository.emailExiste(request.email);
    if (usuárioExiste) {
      throw new RegistrarUsuárioErrors.EmailUtilizado(request.email);
    } else {
      return this.userRepository.criarComEmailSenha({
        email: request.email,
        senha: request.senha,
      });
    }
  }
}

export namespace RegistrarUsuárioErrors {
  export class EmailUtilizado extends Error {
    constructor(email: string) {
      super(`Já existe um usuário com o email ${email} na base`);
    }
  }
}
