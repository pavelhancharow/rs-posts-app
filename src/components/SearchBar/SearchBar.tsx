import { FormEvent, useContext, useRef } from 'react';
import { localStorageService, postsService } from '../../api';
import SearchIcon from '../../assets/search.svg';
import {
  PostsListContext,
  PostsListDispatchContext,
} from '../../context/PostsListContext.tsx';
import { ButtonTypes, LoadingStatuses } from '../../enums';
import CustomButton from '../CustomButton/CustomButton.tsx';
import styles from './SearchBar.module.css';

function SearchBar() {
  const context = useContext(PostsListContext);
  const dispatch = useContext(PostsListDispatchContext);
  const ref = useRef<HTMLInputElement>(null);
  const defaultValue = localStorageService.searchTerm;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = ref.current?.value.trim() as string;

    try {
      dispatch({ type: LoadingStatuses.Pending });

      localStorageService.searchTerm = searchValue;

      const response = searchValue
        ? await postsService.getPostsBySearchValue(searchValue)
        : await postsService.getAllPosts();

      dispatch({
        type: LoadingStatuses.Fulfilled,
        payload: response.posts,
      });
    } catch (e) {
      dispatch({
        type: LoadingStatuses.Rejected,
        payload: (e as Error).message,
      });
    }
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
          defaultValue={defaultValue}
          className={styles.form__input}
        />
      </label>

      <CustomButton
        type={ButtonTypes.Submit}
        disabled={context.status === LoadingStatuses.Pending}
      >
        Search
      </CustomButton>
    </form>
  );
}

export default SearchBar;
