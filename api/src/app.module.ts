import { Module } from '@nestjs/common';
import { AuthController } from './app/infrastructure/auth/Auth.controller';
import { InfrastructureModule } from './app/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
