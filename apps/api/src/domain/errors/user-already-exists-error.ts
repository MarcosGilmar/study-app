export class UserAlreadyExistsError extends Error {
  constructor() {
    super('There is already an user with the same email');
    this.name = 'UserAlreadyExistsError';
  }
}
