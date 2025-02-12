import { FormEvent, useContext, useRef } from 'react';
import { localStorageService } from '../../services';
import SearchIcon from '../../assets/search.svg';
import { SearchQueryDispatchContext } from '../../context';
import SearchBarButton from '../SearchBarButton/SearchBarButton.tsx';
import styles from './SearchBar.module.css';

function SearchBar() {
  const updateSearchQuery = useContext(SearchQueryDispatchContext);
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateSearchQuery({
      q: ref.current?.value.trim(),
      skip: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="search" className={styles.form__label}>
        <img
          src={SearchIcon}
          alt="search icon"
          className={styles.form__image}
        />
        <input
          type="text"
          name="search"
          ref={ref}
          placeholder="Search"
          defaultValue={localStorageService.searchParams.q}
          className={styles.form__input}
        />
      </label>
      <SearchBarButton />
    </form>
  );
}

export default SearchBar;
