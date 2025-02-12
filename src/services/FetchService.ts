import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { QueryReturnValue } from '@reduxjs/toolkit/query/react';

type MaybePromise<T> = T | PromiseLike<T>;
type FetchArgsType = string | FetchArgs;
type FetchQueryReturnValue<T> = MaybePromise<
  QueryReturnValue<T | unknown, FetchBaseQueryError, FetchBaseQueryMeta>
>;

type FetchWithBQType = <T>(arg: FetchArgsType) => FetchQueryReturnValue<T>;

export class FetchService {
  #fetchWithBQ: FetchWithBQType;

  constructor(fetchWithBQ: FetchWithBQType) {
    this.#fetchWithBQ = fetchWithBQ;
  }

  fetch<T>(arg: FetchArgsType) {
    return this.#fetchWithBQ<T>(arg) as MaybePromise<
      QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta>
    >;
  }
}
