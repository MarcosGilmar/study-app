import { Body, Controller, Post } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { CreateSubjectUseCase } from 'src/domain/use-cases/create-subject';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import type { TokenPayloadSchema } from 'src/infra/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import z from 'zod';

const createSubjectBodySchema = z.object({
  name: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres'),
});

type CreateSubjectBodySchema = z.infer<typeof createSubjectBodySchema>;

@Controller('/subjects')
export class CreateSubjectController {
  constructor(private createSubject: CreateSubjectUseCase) {}

  @Post()
  async handle(
    @CurrentUser() currentUser: TokenPayloadSchema,
    @Body(new ZodValidationPipe(createSubjectBodySchema))
    body: CreateSubjectBodySchema,
  ) {
    const { name } = body;

    await this.createSubject.execute({
      name,
      userId: new UniqueEntityId(currentUser.sub),
    });
  }
}
