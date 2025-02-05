import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { localStorageService, postsService } from '../api';
import { LoadingStatuses } from '../enums';
import { Post } from '../models';

interface SearchContextState {
  posts: Array<Post>;
  error: string | null;
  status: LoadingStatuses;
}

const initialState: SearchContextState = {
  posts: [],
  status: LoadingStatuses.Idle,
  error: null,
};

type DispatchActionType = {
  type: LoadingStatuses;
  payload?: string | Array<Post>;
};

const SearchContext = createContext<SearchContextState>({
  ...initialState,
});

const SearchDispatchContext = createContext<Dispatch<DispatchActionType>>(
  () => {}
);

interface SearchContextProps {
  children: ReactNode;
}

function SearchContextProvider(props: SearchContextProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const searchedTerm = localStorageService.searchTerm;

    dispatch({ type: LoadingStatuses.Pending });

    const result = searchedTerm
      ? postsService.getPostsBySearchValue(searchedTerm, signal)
      : postsService.getAllPosts(signal);

    result
      .then((data) => {
        dispatch({
          type: LoadingStatuses.Fulfilled,
          payload: data.posts,
        });
      })
      .catch((e: Error) => {
        if (signal.aborted) {
          console.info(e?.message);
        } else {
          dispatch({
            type: LoadingStatuses.Rejected,
            payload: e.message,
          });
        }
      });

    return () => {
      controller.abort({
        message:
          '\x1B[34mAbortController:\x1B[30m Fetching data has been aborted',
      });
    };
  }, []);

  return (
    <SearchContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {props.children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

const reducer = (state: SearchContextState, action: DispatchActionType) => {
  switch (action.type) {
    case LoadingStatuses.Pending:
      return {
        ...state,
        status: LoadingStatuses.Pending,
      };
    case LoadingStatuses.Fulfilled:
      return {
        status: LoadingStatuses.Fulfilled,
        error: null,
        posts: action.payload as Post[],
      };
    case LoadingStatuses.Rejected:
      return {
        posts: [],
        status: LoadingStatuses.Rejected,
        error: action.payload as string,
      };
    default:
      return { posts: [], status: LoadingStatuses.Idle, error: null };
  }
};

export default SearchContextProvider;

export { SearchContext, SearchDispatchContext };
