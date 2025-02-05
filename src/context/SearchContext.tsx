import { Component, createContext, Dispatch, ReactNode } from 'react';
import { localStorageService, postsService } from '../api';
import { LoadingStatuses } from '../enums';
import { Post } from '../models';

type AbortControllerType = { current: AbortController | null };

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

class SearchContextProvider extends Component<
  SearchContextProps,
  SearchContextState
> {
  controller: AbortControllerType = { current: null };
  state: SearchContextState = { ...initialState };

  componentDidMount() {
    if (this.state.status === LoadingStatuses.Idle) {
      this.controller.current = new AbortController();
      const signal = this.controller.current.signal;

      const searchedTerm = localStorageService.searchTerm;

      this.dispatch({ type: LoadingStatuses.Pending });

      const result = searchedTerm
        ? postsService.getPostsBySearchValue(searchedTerm, signal)
        : postsService.getAllPosts(signal);

      result
        .then((data) => {
          this.dispatch({
            type: LoadingStatuses.Fulfilled,
            payload: data.posts,
          });
        })
        .catch((e: Error) => {
          if (signal.aborted) {
            console.info(e?.message);
          } else {
            this.dispatch({
              type: LoadingStatuses.Rejected,
              payload: e.message,
            });
          }
        });
    }
  }

  componentWillUnmount() {
    this.controller.current?.abort({
      message:
        '\x1B[34mAbortController:\x1B[30m Fetching data has been aborted',
    });
    this.dispatch({ type: LoadingStatuses.Idle });
  }

  dispatch = (action: DispatchActionType) => {
    switch (action.type) {
      case LoadingStatuses.Pending:
        this.setState((prevState) => ({
          ...prevState,
          status: LoadingStatuses.Pending,
        }));
        break;
      case LoadingStatuses.Fulfilled:
        this.setState({
          status: LoadingStatuses.Fulfilled,
          error: null,
          posts: action.payload as Post[],
        });
        break;
      case LoadingStatuses.Rejected:
        this.setState({
          posts: [],
          status: LoadingStatuses.Rejected,
          error: action.payload as string,
        });
        break;
      default:
        this.setState({ posts: [], status: LoadingStatuses.Idle, error: null });
        break;
    }
  };

  render() {
    return (
      <SearchContext.Provider value={this.state}>
        <SearchDispatchContext.Provider value={this.dispatch}>
          {this.props.children}
        </SearchDispatchContext.Provider>
      </SearchContext.Provider>
    );
  }
}

export default SearchContextProvider;

export { SearchContext, SearchDispatchContext };
