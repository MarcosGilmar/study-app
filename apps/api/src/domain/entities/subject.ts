import { randomUUID } from 'node:crypto';

export interface SubjectProps {
  name: string;
  userId: string;
  createdAt?: Date;
}

export class Subject {
  private readonly _id: string;
  private props: SubjectProps;

  private constructor(props: SubjectProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  static create(props: SubjectProps, id?: string) {
    return new Subject(props, id);
  }
}
