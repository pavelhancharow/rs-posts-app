import { Post } from './Post';
import { FullPost } from './FullPost';

interface BaseResponse {
  total: number;
  skip: number;
  limit: number;
}

export type TypePosts = { posts: Post[] };
export type TypeComments = Pick<FullPost, 'comments'>;

type ApiResponse<T> = BaseResponse & T;
type ResponseTypes = TypePosts | TypeComments;

export type FetchResponse<T> = T extends ResponseTypes ? ApiResponse<T> : T;
