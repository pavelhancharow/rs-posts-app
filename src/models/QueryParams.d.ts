import { PostEntity } from './PostEntity';
import { BaseResponse } from './ApiResponse';

export interface PostsQueryParams extends Pick<BaseResponse, 'limit' | 'skip'> {
  select: Required<Array<keyof PostEntity>>;
  q?: string;
}

export type PostsSearchParams = Omit<PostsQueryParams, 'select'>;
