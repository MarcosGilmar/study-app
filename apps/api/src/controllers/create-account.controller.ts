import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateAccountBody = {
  name: string;
  email: string;
  password: string;
};

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException('Users with the same e-mail');
    }

    const hashedPassword = await hash(password, 8);

    await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    });
  }
}
