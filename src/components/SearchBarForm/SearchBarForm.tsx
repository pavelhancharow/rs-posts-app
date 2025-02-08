import {
  FormEvent,
  ForwardedRef,
  forwardRef,
  ReactNode,
  RefObject,
  useContext,
} from 'react';
import { PostsListUpdateSearchQueryContext } from '../../context/PostsListContext.tsx';
import styles from '../SearchBar/SearchBar.module.css';

interface SearchBarFormProps {
  children: ReactNode;
}

const SearchBarForm = forwardRef(function SearchBarForm(
  props: SearchBarFormProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const updateSearchQuery = useContext(PostsListUpdateSearchQueryContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateSearchQuery({
      q: (ref as RefObject<HTMLInputElement>).current?.value.trim(),
      skip: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {props.children}
    </form>
  );
});

export default SearchBarForm;
