import { Post } from './Post';

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}
