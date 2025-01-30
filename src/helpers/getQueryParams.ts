import { PostsQueryParams } from '../models';

type QueryTypes = PostsQueryParams;

export function getQueryParams(query: QueryTypes) {
  const params: string[] = [];

  for (const key in query) {
    const value = query[key as keyof QueryTypes];

    if (value instanceof Array) {
      params.push(`${key}=${value.join(',')}`);
    } else {
      params.push(`${key}=${value}`);
    }
  }

  return params.join('&');
}
