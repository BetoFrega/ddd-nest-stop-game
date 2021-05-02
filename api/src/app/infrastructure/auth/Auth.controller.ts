import { Body, Controller, Post } from '@nestjs/common';

class RegisterRequest {
  email: string;
  senha: string;
}

@Controller()
export class AuthController {
  @Post('/auth/registrar')
  async login(@Body('usuario') body: RegisterRequest) {
    return {
      usuario: {
        email: body.email,
      },
    };
  }
}
