import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { HashGenerator } from '../cryptography/hash-generator';
import { User } from '../entities/user';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { UsersRepository } from '../repositories/users-repository';

interface CreateUserCaseInput {
  name: string;
  email: string;
  password: string;
}

type CreateUserCaseOutput = Either<UserAlreadyExistsError, void>;
@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserCaseInput): Promise<CreateUserCaseOutput> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return right(undefined);
  }
}
