import { Subject as PrismaSubject } from 'generated/prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Subject } from 'src/domain/entities/subject';

export class PrismaSubjectMapper {
  static toDomain(raw: PrismaSubject): Subject {
    return Subject.create(
      {
        name: raw.name,
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(subject: Subject) {
    return {
      id: subject.id.toValue(),
      name: subject.name,
      userId: subject.userId.toValue(),
    };
  }
}
