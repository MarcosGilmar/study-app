import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { FakeSubjectsRepository } from 'src/test/repositories/fake-subjects-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateSubjectUseCase } from './create-subject';

describe('CreateSubjectUseCase', () => {
  let fakeSubjectRepository: FakeSubjectsRepository;

  let sut: CreateSubjectUseCase;

  beforeEach(() => {
    fakeSubjectRepository = new FakeSubjectsRepository();

    sut = new CreateSubjectUseCase(fakeSubjectRepository);
  });

  it('should create a subject', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      userId: new UniqueEntityId(),
    });

    expect(result.isRight()).toBe(true);
    expect(fakeSubjectRepository.items).toHaveLength(1);
  });

  it('should not create a subject with the same name', async () => {
    await sut.execute({
      name: 'John Doe',
      userId: new UniqueEntityId('1234'),
    });

    const result = await sut.execute({
      name: 'John Doe',
      userId: new UniqueEntityId('1234'),
    });

    expect(result.isLeft()).toBe(true);
  });
});
