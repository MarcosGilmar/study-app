import { Injectable } from '@nestjs/common';
import { Subject } from 'src/domain/entities/subject';
import { SubjectsRepository } from 'src/domain/repositories/subjects-repository';

@Injectable()
export class PrismaSubjectsRepository implements SubjectsRepository {
  create(subject: Subject): Promise<void> {
    throw new Error('Method not implemented');
  }

  findWithSameName(name: string): Promise<Subject | null> {
    throw new Error('Method not implemented');
  }
}
