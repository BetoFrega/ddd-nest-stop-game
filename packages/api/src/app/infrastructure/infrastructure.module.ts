import { Module } from '@nestjs/common';
import { PrismaService } from './repositories/Prisma.service';
import { UsuáriosRepository } from './repositories/UsuáriosRepository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/Auth.controller';
import { AuthService } from './auth/Auth.service';
import { LocalCadastroStrategy } from './auth/LocalCadastro.strategy';
import { LocalLoginStrategy } from './auth/LocalLogin.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: 'IUsuáriosRepository', useClass: UsuáriosRepository },
    AuthService,
    LocalCadastroStrategy,
    LocalLoginStrategy,
  ],
  exports: [
    { provide: 'IUsuáriosRepository', useClass: UsuáriosRepository },
    PrismaService,
  ],
})
export class InfrastructureModule {}
