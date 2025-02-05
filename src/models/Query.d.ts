import { Post } from './Post';
import { User } from './User';
import { BaseResponse } from './PostsResponse';

export interface PostsQueryParams extends Pick<BaseResponse, 'limit' | 'skip'> {
  select: Required<Array<keyof Post>>;
  q?: string;
}

export interface UserQueryParams {
  select: Array<keyof User>;
}
