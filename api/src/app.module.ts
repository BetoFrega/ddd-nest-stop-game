import { Module } from '@nestjs/common';
import { AuthController } from './app/infrastructure/auth/Auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
