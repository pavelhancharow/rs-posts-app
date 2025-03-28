import { fetchFromApi } from '../helpers';
import { FetchResponse, TypeComments } from '../models';

class CommentsService {
  #endpoints = {
    comments: '/comments/post',
  };

  async getCommentsByPostId(
    postId: string,
    signal?: AbortSignal
  ): Promise<FetchResponse<TypeComments>> {
    return await fetchFromApi(`${this.#endpoints.comments}/${postId}`, signal);
  }
}

export const commentsService = new CommentsService();
