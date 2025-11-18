import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type category = {
    id: Generated<string>;
    name: string;
};
export type currency = {
    code: string;
    name: string;
    symbol: string;
    decimalPlaces: Generated<number>;
};
export type record = {
    id: Generated<string>;
    createdAt: Generated<Timestamp>;
    userId: string;
    categoryId: string;
    cost: string;
    currencyCode: string;
};
export type user = {
    id: Generated<string>;
    name: string;
    defaultCurrencyCode: string | null;
};
export type DB = {
    category: category;
    currency: currency;
    record: record;
    user: user;
};
