import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import type { TokenPayloadSchema } from 'src/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import z from 'zod';

const createSubjectBodySchema = z.object({
  name: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres'),
});

type CreateSubjectBodySchema = z.infer<typeof createSubjectBodySchema>;

@Controller('/subjects')
@UseGuards(JwtAuthGuard)
export class CreateSubjectController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async handle(
    @CurrentUser() currentUser: TokenPayloadSchema,
    @Body(new ZodValidationPipe(createSubjectBodySchema))
    body: CreateSubjectBodySchema,
  ) {
    const { name } = body;

    const subjectWithSameName = await this.prismaService.subject.findFirst({
      where: {
        name,
      },
    });

    if (subjectWithSameName) {
      throw new ConflictException('Subjects with the same name');
    }

    const userId = currentUser.sub;

    await this.prismaService.subject.create({
      data: {
        name,
        userId,
      },
    });
  }
}
