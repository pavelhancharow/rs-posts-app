import { Post } from './Post';
import { User } from './User';

export interface Comment {
  id: number;
  body: string;
  postId: Post['id'];
  likes: number;
  user: Pick<User, 'id' | 'username'> & { fullName: string };
}
