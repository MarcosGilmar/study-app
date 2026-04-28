export class SubjectAlreadyCreatedError extends Error {
  constructor() {
    super('There is already a subject with the same name');
    this.name = 'SubjectAlreadyCreatedError';
  }
}
