import { createContext, ReactNode } from 'react';
import { localStorageService } from '../api';
import { useSearchQuery } from '../hooks';
import { PostsSearchParams } from '../models';

const PostsListSearchQueryContext = createContext<PostsSearchParams>(
  localStorageService.searchParams
);

const PostsListUpdateSearchQueryContext = createContext<
  (newParams: Partial<PostsSearchParams>) => void
>(() => {});

interface PostsListContextProps {
  children: ReactNode;
}

function PostsListContextProvider(props: PostsListContextProps) {
  const { query, updateSearchQuery } = useSearchQuery();

  return (
    <PostsListSearchQueryContext.Provider value={query}>
      <PostsListUpdateSearchQueryContext.Provider value={updateSearchQuery}>
        {props.children}
      </PostsListUpdateSearchQueryContext.Provider>
    </PostsListSearchQueryContext.Provider>
  );
}

export default PostsListContextProvider;

export { PostsListSearchQueryContext, PostsListUpdateSearchQueryContext };
