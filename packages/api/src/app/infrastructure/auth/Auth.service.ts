import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJWT(user: { uuid: string; email: string }) {
    const payload = { email: user.email, uuid: user.uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
