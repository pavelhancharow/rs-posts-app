import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

export interface FullPostCard {
  post: Post;
  user: User;
  comments: Comment[];
  totalComments: number;
}
