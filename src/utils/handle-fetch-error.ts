import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function handleFetchError(error: FetchBaseQueryError): never {
  throw error.data;
}
