import { Subject } from 'src/domain/entities/subject';
import { SubjectsRepository } from 'src/domain/repositories/subjects-repository';

export class FakeSubjectsRepository implements SubjectsRepository {
  public items: Subject[] = [];

  async findWithSameName(name: string): Promise<Subject | null> {
    const subject = this.items.find((subject) => subject.name === name);

    if (!subject) return null;

    return subject;
  }

  async create(subject: Subject): Promise<void> {
    this.items.push(subject);
  }
}
