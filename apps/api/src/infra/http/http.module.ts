import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateSubjectController } from './controllers/create-subject.controller';

@Module({
  imports: [PrismaService],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateSubjectController,
  ],
  providers: [],
})
export class HttpModule {}
