import { ConflictException } from '@nestjs/common';
import { Subject } from '../entities/subject';
import { SubjectsRepository } from '../repositories/subjects-repository';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

interface CreateSubjectUseCaseInput {
  name: string;
  userId: UniqueEntityId;
}

export class CreateSubjectUseCase {
  constructor(private subjectsRepository: SubjectsRepository) {}

  async execute({ name, userId }: CreateSubjectUseCaseInput) {
    const subjectWithSameName =
      await this.subjectsRepository.findWithSameName(name);

    if (subjectWithSameName) {
      throw new ConflictException('Subjects with the same name'); //Desacoplar dessa camada o Conflict
    }

    const subject = Subject.create({
      name,
      userId,
    });

    await this.subjectsRepository.create(subject);
  }
}
