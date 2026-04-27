import { Injectable } from '@nestjs/common';
import { Subject } from 'src/domain/entities/subject';
import { SubjectsRepository } from 'src/domain/repositories/subjects-repository';
import { PrismaSubjectMapper } from '../mappers/prisma-subject-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaSubjectsRepository implements SubjectsRepository {
  constructor(private prismaService: PrismaService) {}

  async findWithSameName(name: string): Promise<Subject | null> {
    const subject = await this.prismaService.subject.findFirst({
      where: {
        name,
      },
    });

    if (!subject) return null;

    return PrismaSubjectMapper.toDomain(subject);
  }

  async create(subject: Subject): Promise<void> {
    const data = PrismaSubjectMapper.toPrisma(subject);

    await this.prismaService.subject.create({ data });
  }
}
