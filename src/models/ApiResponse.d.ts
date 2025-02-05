import { Post } from './Post';
import { FullPostCard } from './FullPostCard';

interface BaseResponse {
  total: number;
  skip: number;
  limit: number;
}

export type TypePosts = { posts: Post[] };
export type TypeComments = Pick<FullPostCard, 'comments'>;

type ApiResponse<T> = BaseResponse & T;
type ResponseTypes = TypePosts | TypeComments;

export type FetchResponse<T> = T extends ResponseTypes ? ApiResponse<T> : T;
