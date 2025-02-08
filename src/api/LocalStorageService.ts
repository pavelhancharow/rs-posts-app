import { PostsQueryParams } from '../models';

type SearchParamsType = Omit<PostsQueryParams, 'select'>;

class LocalStorageService {
  #searchParams = 'searchParams';
  #detailsParams = 'detailsParams';

  get searchParams() {
    const data = localStorage.getItem(this.#searchParams);
    if (!data) return { skip: 0, limit: 25 };
    return JSON.parse(data);
  }

  set searchParams(term: SearchParamsType) {
    localStorage.setItem(this.#searchParams, JSON.stringify(term));
  }

  get detailsParams() {
    return localStorage.getItem(this.#detailsParams) || '';
  }

  set detailsParams(term: string) {
    localStorage.setItem(this.#detailsParams, term);
  }
}

const localStorageService = new LocalStorageService();

export { localStorageService };
