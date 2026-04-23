import { randomUUID } from 'node:crypto';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User {
  private readonly _id: string;
  private props: UserProps;

  private constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  static create(props: UserProps, id?: string) {
    return new User(props, id);
  }
}
