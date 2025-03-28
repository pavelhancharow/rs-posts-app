import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useLocation } from 'react-router';
import { commentsService, postsService, usersService } from '../api';
import { LoadingStatuses } from '../enums';
import { FullPostCard, FetchResponse, Post, TypeComments } from '../models';

interface FullPostContextState {
  card: FullPostCard | null;
  error: string | null;
  status: LoadingStatuses;
}

const initialState: FullPostContextState = {
  card: null,
  status: LoadingStatuses.Idle,
  error: null,
};

type DispatchActionType = {
  type: LoadingStatuses;
  payload?: string | FullPostCard;
};

const FullPostContext = createContext<FullPostContextState>({
  ...initialState,
});

const FullPostDispatchContext = createContext<Dispatch<DispatchActionType>>(
  () => {}
);

interface FullPostContextProps {
  postId: string;
  children: ReactNode;
}

function FullPostContextProvider(props: FullPostContextProps) {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const ref = useRef<string | undefined>();

  useEffect(() => {
    ref.current = location.state?.userId as string;
  }, [location.state?.userId]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch({ type: LoadingStatuses.Pending });

    const userId = ref.current;

    const handleError = (e: Error) => {
      if (signal.aborted) {
        console.info(e?.message);
      } else {
        dispatch({
          type: LoadingStatuses.Rejected,
          payload: e.message,
        });
      }
    };

    const requests: [
      Promise<FetchResponse<TypeComments>>,
      Promise<FetchResponse<Post>>,
    ] = [
      commentsService.getCommentsByPostId(props.postId, signal),
      postsService.getPostById(props.postId, signal),
    ];

    if (!userId) {
      Promise.all(requests)
        .then((response) =>
          Promise.all([
            usersService.getUserById(response[1].userId, signal),
            ...response,
          ])
        )
        .then(([userById, dataComments, postById]) => {
          dispatch({
            type: LoadingStatuses.Fulfilled,
            payload: {
              post: postById,
              user: userById,
              comments: dataComments.comments,
              totalComments: dataComments.total,
            },
          });
        })
        .catch(handleError);
    } else {
      Promise.all([usersService.getUserById(userId, signal), ...requests])
        .then(([userById, dataComments, postById]) => {
          dispatch({
            type: LoadingStatuses.Fulfilled,
            payload: {
              post: postById,
              user: userById,
              comments: dataComments.comments,
              totalComments: dataComments.total,
            },
          });
        })
        .catch(handleError);
    }

    return () => {
      controller.abort({
        message:
          '\x1B[34mAbortController:\x1B[30m Fetching data has been aborted',
      });
    };
  }, [props.postId, dispatch]);

  return (
    <FullPostContext.Provider value={state}>
      <FullPostDispatchContext.Provider value={dispatch}>
        {props.children}
      </FullPostDispatchContext.Provider>
    </FullPostContext.Provider>
  );
}

const reducer = (state: FullPostContextState, action: DispatchActionType) => {
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
        card: action.payload as FullPostCard,
      };
    case LoadingStatuses.Rejected:
      return {
        card: null,
        status: LoadingStatuses.Rejected,
        error: action.payload as string,
      };
    default:
      return {
        card: null,
        status: LoadingStatuses.Idle,
        error: null,
      };
  }
};

export default FullPostContextProvider;

export { FullPostContext, FullPostDispatchContext };
