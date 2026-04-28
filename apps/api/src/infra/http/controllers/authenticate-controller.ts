import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user';
import { Public } from 'src/infra/auth/public';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import z from 'zod';

const authenticateBodySchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 caracteres'),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(private readonly authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateUser.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      throw new UnauthorizedException();
    }

    const { accessToken } = result.value;

    return { access_token: accessToken };
  }
}
