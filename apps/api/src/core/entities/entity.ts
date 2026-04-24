import { UniqueEntityId } from './unique-entity-id';

export class Entity<T> {
  private _id: UniqueEntityId;
  protected props: T;

  protected constructor(props: T, id?: string) {
    this.props = props;
    this._id = new UniqueEntityId(id);
  }

  get id() {
    return this._id;
  }
}
