import { FakeEncrypter } from 'src/test/cryptography/fake-encrypter';
import { FakeHashComparator } from 'src/test/cryptography/fake-hash-comparator';
import { FakeUserRepository } from 'src/test/repositories/fake-user-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../entities/user';
import { AuthenticateUserUseCase } from './authenticate-user';

describe('AuthenticateUserUseCase', () => {
  let fakeUserRepository: FakeUserRepository;
  let fakeHashComparator: FakeHashComparator;
  let fakeEncrypter: FakeEncrypter;

  let sut: AuthenticateUserUseCase;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashComparator = new FakeHashComparator();
    fakeEncrypter = new FakeEncrypter();

    sut = new AuthenticateUserUseCase(
      fakeUserRepository,
      fakeHashComparator,
      fakeEncrypter,
    );
  });

  it('should be able to authenticate an user', async () => {
    fakeUserRepository.items.push(
      User.create({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'johndoe123-hashed', //hashed
      }),
    );

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: 'johndoe123', //plain
    });

    expect(result.isRight()).toBe(true);
  });

  it('should not be able to authenticate an user with a wrong email', async () => {
    fakeUserRepository.items.push(
      User.create({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'johndoe123-hashed',
      }),
    );

    const result = await sut.execute({
      email: 'johndoe123@email.com', //different email
      password: 'johndoe123',
    });

    expect(result.isLeft()).toBe(true);
  });

  it('should not be able to authenticate an user with a wrong password', async () => {
    fakeUserRepository.items.push(
      User.create({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'johndoe123-hashed',
      }),
    );

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: 'johndoe123456', //different password
    });

    expect(result.isLeft()).toBe(true);
  });
});
