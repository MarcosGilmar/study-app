import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user';
import { CreateSubjectUseCase } from 'src/domain/use-cases/create-subject';
import { CreateUserUseCase } from 'src/domain/use-cases/create-user';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateSubjectController } from './controllers/create-subject.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateSubjectController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    CreateUserUseCase,
    CreateSubjectUseCase,
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
