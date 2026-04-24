import { Entity } from 'src/core/entities/entity';
import { Optional } from 'src/core/types/optional';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: string) {
    return new User({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }
}
