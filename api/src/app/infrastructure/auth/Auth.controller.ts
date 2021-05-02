import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { IUsuáriosRepository } from '../repositories/UsuáriosRepository';
import { LocalAuthGuard } from './RegisterLocalAuth.guard';
import { AuthService } from './Auth.service';

@Controller()
export class AuthController {
  constructor(
    @Inject('IUsuáriosRepository')
    private readonly usuáriosRepository: IUsuáriosRepository,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/cadastro')
  async cadastro(@Request() request) {
    return {
      ...request.user,
      jwt: this.authService.generateJWT({
        email: request.user.email,
        uuid: request.user.uuid,
      }).access_token,
    };
  }
}
