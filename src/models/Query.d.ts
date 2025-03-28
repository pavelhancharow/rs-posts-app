import { Post } from './Post';
import { PostsResponse } from './PostsResponse';

export interface PostsQueryParams
  extends Pick<PostsResponse, 'limit' | 'skip'> {
  select: Array<keyof Post>;
  q?: string;
}
