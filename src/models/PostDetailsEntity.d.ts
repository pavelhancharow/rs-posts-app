import { Comment } from './CommentEntity';
import { PostEntity } from './PostEntity';
import { UserEntity } from './UserEntity';

export interface PostDetailsEntity {
  post: PostEntity;
  user: UserEntity;
  comments: Comment[];
  totalComments: number;
}
