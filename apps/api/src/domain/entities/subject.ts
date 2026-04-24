import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/utils/optional';

export interface SubjectProps {
  name: string;
  userId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Subject extends Entity<SubjectProps> {
  private constructor(props: SubjectProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: Optional<SubjectProps, 'createdAt'>, id?: UniqueEntityId) {
    return new Subject(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );
  }

  get name() {
    return this.props.name;
  }
}
