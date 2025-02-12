import { createContext, ReactNode } from 'react';
import { localStorageService } from '../services';
import { useSearchQuery } from '../hooks';
import { PostsSearchParams } from '../models';

const SearchQueryContext = createContext<PostsSearchParams>(
  localStorageService.searchParams
);

const SearchQueryDispatchContext = createContext<
  (newParams: Partial<PostsSearchParams>) => void
>(() => {});

interface SearchQueryContextProps {
  children: ReactNode;
}

function SearchQueryContextProvider(props: SearchQueryContextProps) {
  const { query, updateSearchQuery } = useSearchQuery();

  return (
    <SearchQueryContext.Provider value={query}>
      <SearchQueryDispatchContext.Provider value={updateSearchQuery}>
        {props.children}
      </SearchQueryDispatchContext.Provider>
    </SearchQueryContext.Provider>
  );
}

export default SearchQueryContextProvider;

export { SearchQueryContext, SearchQueryDispatchContext };
