import { PostEntity } from './PostEntity';
import { PostDetailsEntity } from './PostDetailsEntity';

interface BaseResponse {
  total: number;
  skip: number;
  limit: number;
}

export type TypePosts = { posts: PostEntity[] };
export type TypeComments = Pick<PostDetailsEntity, 'comments'>;

type ApiResponse<T> = BaseResponse & T;
type ResponseTypes = TypePosts | TypeComments;

export type FetchResponse<T> = T extends ResponseTypes ? ApiResponse<T> : T;
