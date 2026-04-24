import { Entity } from 'src/core/entities/entity';
import { Optional } from 'src/core/types/optional';

export interface SubjectProps {
  name: string;
  userId: string; //talvez mudar para UniqueEntityId
  createdAt: Date;
  updatedAt?: Date;
}

export class Subject extends Entity<SubjectProps> {
  private constructor(props: SubjectProps, id?: string) {
    super(props, id);
  }

  static create(props: Optional<SubjectProps, 'createdAt'>, id?: string) {
    return new Subject(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );
  }

  get name() {
    return this.props.name;
  }
}
