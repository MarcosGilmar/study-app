import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaSubjectsRepository } from './prisma/repositories/prisma-subjects-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [PrismaService, PrismaUsersRepository, PrismaSubjectsRepository],
  exports: [PrismaService, PrismaUsersRepository, PrismaSubjectsRepository],
})
export class DatabaseModule {}
