class LocalStorageService {
  #searchTerm = 'searchTerm';

  get searchTerm() {
    return localStorage.getItem(this.#searchTerm) || '';
  }

  set searchTerm(term: string) {
    localStorage.setItem(this.#searchTerm, term);
  }
}

const localStorageService = new LocalStorageService();

export { localStorageService };
