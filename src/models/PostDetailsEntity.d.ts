import { CommentEntity } from './CommentEntity';
import { PostEntity } from './PostEntity';
import { UserEntity } from './UserEntity';

export interface PostDetailsEntity {
  post: PostEntity;
  user: UserEntity;
  comments: CommentEntity[];
  totalComments: number;
}
