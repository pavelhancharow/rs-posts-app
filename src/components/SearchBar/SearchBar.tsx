import { useRef } from 'react';
import { localStorageService } from '../../api';
import SearchIcon from '../../assets/search.svg';
import SearchBarButton from '../SearchBarButton/SearchBarButton.tsx';
import SearchBarForm from '../SearchBarForm/SearchBarForm.tsx';
import styles from './SearchBar.module.css';

function SearchBar() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <SearchBarForm ref={ref}>
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
    </SearchBarForm>
  );
}

export default SearchBar;
