import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { localStorageService, postsService } from '../api';
import { LoadingStatuses } from '../enums';
import { ApiResponse, TypePosts } from '../models';

interface PostsListContextState {
  data: ApiResponse<TypePosts>;
  error: string | null;
  status: LoadingStatuses;
}

const initialState: PostsListContextState = {
  data: {
    total: 0,
    skip: 0,
    limit: 25,
    posts: [],
  },
  status: LoadingStatuses.Idle,
  error: null,
};

type DispatchActionType = {
  type: LoadingStatuses;
  payload?: string | ApiResponse<TypePosts>;
};

const PostsListContext = createContext<PostsListContextState>({
  ...initialState,
});

const PostsListDispatchContext = createContext<Dispatch<DispatchActionType>>(
  () => {}
);

interface PostsListContextProps {
  children: ReactNode;
}

function PostsListContextProvider(props: PostsListContextProps) {
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
      .then((response) => {
        dispatch({
          type: LoadingStatuses.Fulfilled,
          payload: response,
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
    <PostsListContext.Provider value={state}>
      <PostsListDispatchContext.Provider value={dispatch}>
        {props.children}
      </PostsListDispatchContext.Provider>
    </PostsListContext.Provider>
  );
}

const reducer = (
  state: PostsListContextState,
  action: DispatchActionType
): PostsListContextState => {
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
        data: action.payload as ApiResponse<TypePosts>,
      };
    case LoadingStatuses.Rejected:
      return {
        data: { ...initialState.data },
        status: LoadingStatuses.Rejected,
        error: action.payload as string,
      };
    default:
      return {
        data: { ...initialState.data },
        status: LoadingStatuses.Idle,
        error: null,
      };
  }
};

export default PostsListContextProvider;

export { PostsListContext, PostsListDispatchContext };
