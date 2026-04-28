import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparator } from '../cryptography/hash-comparator';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { UsersRepository } from '../repositories/users-repository';

interface AuthenticateUserUseCaseInput {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseOutput = Either<
  InvalidCredentialsError,
  { accessToken: string }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparator: HashComparator,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseInput): Promise<AuthenticateUserUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const isPasswordValid = await this.hashComparator.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toValue(),
    });

    return right({
      accessToken,
    });
  }
}
