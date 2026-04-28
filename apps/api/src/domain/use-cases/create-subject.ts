import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Subject } from '../entities/subject';
import { SubjectAlreadyCreatedError } from '../errors/subject-already-created';
import { SubjectsRepository } from '../repositories/subjects-repository';

interface CreateSubjectUseCaseInput {
  name: string;
  userId: UniqueEntityId;
}

type CreateSubjectUseCaseOutput = Either<SubjectAlreadyCreatedError, void>;

@Injectable()
export class CreateSubjectUseCase {
  constructor(private subjectsRepository: SubjectsRepository) {}

  async execute({
    name,
    userId,
  }: CreateSubjectUseCaseInput): Promise<CreateSubjectUseCaseOutput> {
    const subjectWithSameName =
      await this.subjectsRepository.findWithSameName(name);

    if (subjectWithSameName) {
      return left(new SubjectAlreadyCreatedError());
    }

    const subject = Subject.create({
      name,
      userId,
    });

    await this.subjectsRepository.create(subject);

    return right(undefined);
  }
}
