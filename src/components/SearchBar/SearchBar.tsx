import { Component, ContextType, createRef, FormEvent } from 'react';
import { localStorageService, postsService } from '../../api';
import SearchIcon from '../../assets/search.svg';
import {
  PostsListContext,
  PostsListDispatchContext,
} from '../../context/PostsListContext.tsx';
import { ButtonTypes, LoadingStatuses } from '../../enums';
import CustomButton from '../CustomButton/CustomButton.tsx';
import styles from './SearchBar.module.css';

class SearchBar extends Component {
  static contextType = PostsListDispatchContext;
  declare context: ContextType<typeof PostsListDispatchContext>;
  ref = createRef<HTMLInputElement>();

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = this.ref.current?.value.trim() as string;

    try {
      this.context({ type: LoadingStatuses.Pending });

      localStorageService.searchTerm = searchValue;

      const response = searchValue
        ? await postsService.getPostsBySearchValue(searchValue)
        : await postsService.getAllPosts();

      this.context({
        type: LoadingStatuses.Fulfilled,
        payload: response.posts,
      });
    } catch (e) {
      this.context({
        type: LoadingStatuses.Rejected,
        payload: (e as Error).message,
      });
    }
  };

  render() {
    const defaultValue = localStorageService.searchTerm;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label htmlFor="search" className={styles.form__label}>
          <img
            src={SearchIcon}
            alt="search icon"
            className={styles.form__image}
          />
          <input
            type="text"
            name="search"
            ref={this.ref}
            placeholder="Search"
            defaultValue={defaultValue}
            className={styles.form__input}
          />
        </label>

        <PostsListContext.Consumer>
          {(state) => (
            <CustomButton
              type={ButtonTypes.Submit}
              disabled={state.status === LoadingStatuses.Pending}
            >
              Search
            </CustomButton>
          )}
        </PostsListContext.Consumer>
      </form>
    );
  }
}

export default SearchBar;
