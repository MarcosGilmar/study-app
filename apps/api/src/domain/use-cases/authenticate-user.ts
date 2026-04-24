import { UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { compare } from 'bcryptjs';

interface AuthenticateUserUseCaseInput {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUserUseCaseInput) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User credentials do not match'); // Desacoplar dessa camada o UnauthorizedException
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match');
    }

    return {
      user,
    };
  }
}
