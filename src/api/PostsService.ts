import { getQueryParams } from '../helpers';
import { PostsQueryParams, PostsResponse } from '../models';

class PostsService {
  #link = 'https://dummyjson.com';
  #endpoints = {
    posts: '/posts',
    search: '/posts/search',
  };
  #defaultQueryParams: PostsQueryParams = {
    limit: 30,
    skip: 0,
    select: ['id', 'title', 'body', 'reactions', 'views'],
  };

  async getAll(signal?: AbortSignal): Promise<PostsResponse> {
    const params = getQueryParams({ ...this.#defaultQueryParams });

    const response = await fetch(
      `${this.#link}${this.#endpoints.posts}?${params}`,
      { signal }
    );

    return await response.json();
  }

  async getBy(
    searchValue: string,
    signal?: AbortSignal
  ): Promise<PostsResponse> {
    const params = getQueryParams({
      ...this.#defaultQueryParams,
      q: searchValue,
    });

    const response = await fetch(
      `${this.#link}${this.#endpoints.search}?${params}`,
      { signal }
    );

    return await response.json();
  }
}

export const postsService = new PostsService();
