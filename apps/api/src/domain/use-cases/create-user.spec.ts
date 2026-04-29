import { FakeHashGenerator } from 'src/test/cryptography/fake-hash-generator';
import { FakeUserRepository } from 'src/test/repositories/fake-user-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { CreateUserUseCase } from './create-user';

describe('CreateUserUseCase', () => {
  let fakeUserRepository: FakeUserRepository;
  let fakeHashGenerator: FakeHashGenerator;

  let sut: CreateUserUseCase; //System Under Test

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashGenerator = new FakeHashGenerator();

    sut = new CreateUserUseCase(fakeUserRepository, fakeHashGenerator);
  });

  it('should create an user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'johndoe123',
    });

    expect(result.isRight()).toBe(true);
    expect(fakeUserRepository.items).toHaveLength(1);
  });

  it('should not create an user with the same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'johndoe123',
    });

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'johndoe123',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
    expect(fakeUserRepository.items).toHaveLength(1);
  });
});
