import { fetchFromApi, getURLSearchParams } from '../helpers';
import { FetchResponse, Post, PostsQueryParams, TypePosts } from '../models';

class PostsService {
  #endpoints = {
    posts: '/posts',
    search: '/posts/search',
  };
  #defaultQueryParams: PostsQueryParams = {
    limit: 30,
    skip: 0,
    select: ['id', 'title', 'body', 'reactions', 'views', 'userId'],
  };

  async getAllPosts(signal?: AbortSignal): Promise<FetchResponse<TypePosts>> {
    const params = getURLSearchParams(this.#defaultQueryParams);

    return await fetchFromApi(`${this.#endpoints.posts}?${params}`, signal);
  }

  async getPostById(
    postId: string | number,
    signal?: AbortSignal
  ): Promise<FetchResponse<Post>> {
    return await fetchFromApi(`${this.#endpoints.posts}/${postId}`, signal);
  }

  async getPostsBySearchValue(
    searchValue: string,
    signal?: AbortSignal
  ): Promise<FetchResponse<TypePosts>> {
    const params = getURLSearchParams({
      ...this.#defaultQueryParams,
      q: searchValue,
    });

    return await fetchFromApi(`${this.#endpoints.search}?${params}`, signal);
  }
}

export const postsService = new PostsService();
