import { http, HttpResponse } from 'msw';
import mockData from './data.ts';

const handlers = [
  http.get('https://dummyjson.com/posts', ({ request }) => {
    const url = new URL(request.url);

    return HttpResponse.json({
      posts: mockData.mockPosts,
      total: mockData.mockPosts.length,
      skip: url.searchParams.get('skip') || 0,
      limit: url.searchParams.get('limit') || 10,
    });
  }),

  http.get('https://dummyjson.com/posts/:id', ({ request }) => {
    const url = new URL(request.url);

    const post = mockData.mockPosts.find(
      (comment) => comment.id === +url.pathname.split('/')[2]
    );

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(post);
  }),

  http.get('/comments/post/:id', ({ request }) => {
    const url = new URL(request.url);

    const comments = mockData.mockComments.filter(
      (comment) => comment.postId === +url.pathname.split('/')[3]
    );

    return HttpResponse.json({
      comments: comments,
      total: comments.length,
      skip: url.searchParams.get('skip') || 0,
      limit: url.searchParams.get('limit') || 10,
    });
  }),

  http.get('/users/:id', ({ request }) => {
    const url = new URL(request.url);

    const user = mockData.mockUsers.find(
      (comment) => comment.id === +url.pathname.split('/')[2]
    );

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),
];

export default handlers;
