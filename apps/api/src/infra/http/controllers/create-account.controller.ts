import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/use-cases/create-user';
import { Public } from 'src/infra/auth/public';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import z from 'zod';

const createAccountBodySchema = z.object({
  name: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 caracteres'),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    await this.createUser.execute({ name, email, password });
  }
}
