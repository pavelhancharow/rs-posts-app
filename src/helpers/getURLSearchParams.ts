import { PostsQueryParams, UserQueryParams } from '../models';

type QueryParamsTypes = PostsQueryParams | UserQueryParams;

export function getURLSearchParams(queryParams: QueryParamsTypes) {
  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    params.append(key, value);
  });

  return params;
}
