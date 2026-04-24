import { ConflictException } from '@nestjs/common';
import { Subject } from '../entities/subject';
import { SubjectsRepository } from '../repositories/subjects-repository';

interface CreateSubjectUseCaseInput {
  name: string;
  userId: string;
}

export class CreateSubjectUseCase {
  constructor(private subjectsRepository: SubjectsRepository) {}

  async execute({ name, userId }: CreateSubjectUseCaseInput) {
    const subjectWithSameName =
      await this.subjectsRepository.findWithSameName(name);

    if (subjectWithSameName) {
      throw new ConflictException('Subjects with the same name');
    }

    const subject = Subject.create({
      name,
      userId,
    });

    await this.subjectsRepository.create(subject)
  }
}
