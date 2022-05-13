import { option } from 'fp-ts';
import { Option } from 'fp-ts/Option';

export class Database {
  database = new Map();

  set(key: string, value: unknown) {
    this.database.set(key, value);
  }

  get(key: string): Option<unknown> {
    return option.fromNullable(this.database.get(key));
  }
}
