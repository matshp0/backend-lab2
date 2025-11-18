import type { ColumnType } from 'kysely';
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type category = {
  id: Generated<string>;
  name: string;
};
export type record = {
  id: Generated<string>;
  createdAt: Generated<Timestamp>;
  userId: string;
  categoryId: string;
  cost: string;
};
export type user = {
  id: Generated<string>;
  name: string;
};
export type DB = {
  category: category;
  record: record;
  user: user;
};
