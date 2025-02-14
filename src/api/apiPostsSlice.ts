import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchService } from '../services';
import {
  FetchResponse,
  PostDetailsEntity,
  PostEntity,
  PostsQueryParams,
  PostsSearchParams,
  TypeComments,
  TypePosts,
  UserEntity,
} from '../models';

type PostsResponse = FetchResponse<TypePosts>;
type PostResponse = FetchResponse<PostEntity>;
type CommentsResponse = FetchResponse<TypeComments>;
type UserResponse = FetchResponse<UserEntity>;

const defaultQueryParams: PostsQueryParams = {
  limit: 25,
  skip: 0,
  select: ['id', 'title', 'body', 'reactions', 'tags', 'views', 'userId'],
};

export const apiPostsSlice = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    signal: new AbortController().signal,
  }),
  tagTypes: ['Posts', 'FullPost'],
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostsResponse, PostsSearchParams>({
      providesTags: ['Posts'],
      query: (searchParams) => {
        return {
          url: searchParams.q ? '/posts/search' : '/posts',
          method: 'GET',
          params: {
            ...defaultQueryParams,
            ...searchParams,
          },
        };
      },
    }),
    getFullPost: builder.query<PostDetailsEntity, { postId: string }>({
      providesTags: ['FullPost'],
      queryFn: async ({ postId }, _api, _, fetchWithBQ) => {
        try {
          const fetchService = new FetchService(fetchWithBQ);
          const [postResponse, commentsResponse] = await Promise.all([
            fetchService.fetch<PostResponse>(`/posts/${postId}`),
            fetchService.fetch<CommentsResponse>(`/comments/post/${postId}`),
          ]);

          if (!postResponse.data || !commentsResponse.data) {
            throw new Error('PostEntity or Comments not found');
          }

          const userResponse = await fetchService.fetch<UserResponse>({
            url: `/users/${postResponse.data.userId}`,
            params: {
              select: ['id', 'firstName', 'lastName', 'username', 'image'],
            },
          });

          if (!userResponse.data) {
            throw new Error('UserEntity Not Found');
          }

          return {
            data: {
              post: postResponse.data,
              user: userResponse.data,
              comments: commentsResponse.data.comments,
              totalComments: commentsResponse.data.total,
            },
          };
        } catch (error) {
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export const { useGetAllPostsQuery, useGetFullPostQuery } = apiPostsSlice;
