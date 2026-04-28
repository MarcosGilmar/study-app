import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encrypter } from 'src/domain/cryptography/encrypter';
import { HashComparator } from 'src/domain/cryptography/hash-comparator';
import { HashGenerator } from 'src/domain/cryptography/hash-generator';
import { AuthModule } from '../auth/auth.module';
import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparator,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
  ],
  exports: [HashGenerator, HashComparator, Encrypter],
})
export class CryptographyModule {}
