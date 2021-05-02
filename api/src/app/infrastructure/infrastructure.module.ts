import { Module } from '@nestjs/common';
import { PrismaService } from './repositories/Prisma.service';
import { UsuáriosRepository } from './repositories/UsuáriosRepository';

@Module({
  providers: [
    PrismaService,
    { provide: 'IUsuáriosRepository', useClass: UsuáriosRepository },
  ],
  exports: [{ provide: 'IUsuáriosRepository', useClass: UsuáriosRepository }],
})
export class InfrastructureModule {}
