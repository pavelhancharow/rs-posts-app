import { fetchFromApi, getURLSearchParams } from '../helpers';
import { FetchResponse, Post, PostsQueryParams, TypePosts } from '../models';

class PostsService {
  #endpoints = {
    posts: '/posts',
    search: '/posts/search',
  };
  #defaultQueryParams: PostsQueryParams = {
    limit: 25,
    skip: 0,
    select: ['id', 'title', 'body', 'reactions', 'tags', 'views', 'userId'],
  };

  async getAllPosts(
    searchParams: Omit<PostsQueryParams, 'select'>,
    signal?: AbortSignal
  ): Promise<FetchResponse<TypePosts>> {
    const params = getURLSearchParams({
      ...this.#defaultQueryParams,
      ...searchParams,
    });

    return await fetchFromApi(`${this.#endpoints.posts}?${params}`, signal);
  }

  async getPostById(
    postId: string | number,
    signal?: AbortSignal
  ): Promise<FetchResponse<Post>> {
    return await fetchFromApi(`${this.#endpoints.posts}/${postId}`, signal);
  }

  async getPostsBySearchValue(
    searchParams: Omit<PostsQueryParams, 'select'>,
    signal?: AbortSignal
  ): Promise<FetchResponse<TypePosts>> {
    const params = getURLSearchParams({
      ...this.#defaultQueryParams,
      ...searchParams,
    });

    return await fetchFromApi(`${this.#endpoints.search}?${params}`, signal);
  }
}

export const postsService = new PostsService();
