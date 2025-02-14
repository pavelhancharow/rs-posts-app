import { PostEntity } from './PostEntity';
import { UserEntity } from './UserEntity';

export interface Comment {
  id: number;
  body: string;
  postId: PostEntity['id'];
  likes: number;
  user: Pick<UserEntity, 'id' | 'username'> & { fullName: string };
}
