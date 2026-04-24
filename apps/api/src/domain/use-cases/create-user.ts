import { ConflictException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';

interface CreateUserCaseInput {
  name: string;
  email: string;
  password: string;
}
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: CreateUserCaseInput): Promise<void> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new ConflictException(); //Desacoplar dessa camada o Conflict
    }

    const hashedPassword = await hash(password, 8); //Desacoplar dessa camada o hash

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);
  }
}
