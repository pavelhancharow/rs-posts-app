import { fetchFromApi, getURLSearchParams } from '../helpers';
import { FetchResponse, User, UserQueryParams } from '../models';

class UsersService {
  #endpoints = {
    users: '/users',
  };
  #defaultQueryParams: UserQueryParams = {
    select: ['id', 'firstName', 'lastName', 'username', 'image'],
  };

  async getUserById(
    userId: string | number,
    signal?: AbortSignal
  ): Promise<FetchResponse<User>> {
    const params = getURLSearchParams(this.#defaultQueryParams);

    return await fetchFromApi(
      `${this.#endpoints.users}/${userId}?${params}`,
      signal
    );
  }
}

export const usersService = new UsersService();
