import { Post, User, Comment, FullPostCard } from '../models';

const mockUsers: User[] = [
  {
    id: 1,
    firstName: 'Ava',
    lastName: 'Harris',
    username: 'avahx',
    image: 'https://dummyjson.com/icon/avahx/128',
  },
  {
    id: 2,
    firstName: 'Levi',
    lastName: 'Hicks',
    username: 'levih',
    image: 'https://dummyjson.com/icon/levih/128',
  },
];

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'His mother had always taught him',
    body: 'His mother had always taught him not to ever think of himself as better than others.',
    reactions: { likes: 192, dislikes: 25 },
    tags: ['history', 'american', 'crime'],
    views: 305,
    userId: 121,
  },
  {
    id: 2,
    title: 'He was an expert but not in a discipline',
    body: 'He was an expert but not in a discipline that anyone could fully appreciate.',
    reactions: { likes: 859, dislikes: 32 },
    tags: ['french', 'fiction', 'english'],
    views: 4884,
    userId: 91,
  },
];

const mockComments: Comment[] = [
  {
    id: 93,
    body: 'These are fabulous ideas!',
    postId: 1,
    likes: 7,
    user: { id: 190, username: 'leahw', fullName: 'Leah Gutierrez' },
  },
  {
    id: 107,
    body: 'You are a symbol of beauty.',
    postId: 1,
    likes: 7,
    user: { id: 131, username: 'jacksonm', fullName: 'Jackson Morales' },
  },
  {
    id: 108,
    body: 'You are a symbol of beauty.',
    postId: 2,
    likes: 5,
    user: { id: 131, username: 'jacksonm', fullName: 'Jackson Morales' },
  },
];

const mockFullPostCard: FullPostCard = {
  post: mockPosts[0],
  user: mockUsers[0],
  comments: [mockComments[0], mockComments[1]],
  totalComments: 2,
};

export default {
  mockComments,
  mockFullPostCard,
  mockPosts,
  mockUsers,
};
