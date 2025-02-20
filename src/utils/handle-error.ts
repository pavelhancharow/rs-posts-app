import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function handleError(error: FetchBaseQueryError): never {
  throw error.data;
}
