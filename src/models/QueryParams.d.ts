import { Post } from './Post';
import { BaseResponse } from './ApiResponse';

export interface PostsQueryParams extends Pick<BaseResponse, 'limit' | 'skip'> {
  select: Required<Array<keyof Post>>;
  q?: string;
}

export type PostsSearchParams = Omit<PostsQueryParams, 'select'>;
