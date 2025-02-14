import { ThemeTypes } from '../enums';
import { PostsSearchParams } from '../models';

class LocalStorageService {
  #searchParams = 'searchParams';
  #detailsParams = 'detailsParams';
  #usersTheme = 'userTheme';

  get searchParams() {
    const data = localStorage.getItem(this.#searchParams);
    if (!data) return { skip: 0, limit: 25 };
    return JSON.parse(data);
  }

  set searchParams(term: PostsSearchParams) {
    localStorage.setItem(this.#searchParams, JSON.stringify(term));
  }

  get detailsParams() {
    return localStorage.getItem(this.#detailsParams) || '';
  }

  set detailsParams(term: string) {
    localStorage.setItem(this.#detailsParams, term);
  }

  get usersTheme() {
    let theme = localStorage.getItem(this.#usersTheme) as ThemeTypes;

    if (!theme) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        theme = ThemeTypes.Dark;
      } else {
        theme = ThemeTypes.Light;
      }
    }

    return theme;
  }

  set usersTheme(term: ThemeTypes) {
    localStorage.setItem(this.#usersTheme, term);
  }
}

const localStorageService = new LocalStorageService();

export { localStorageService };
