import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiPostsSlice } from '../api';

const rootReducer = combineReducers({
  [apiPostsSlice.reducerPath]: apiPostsSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiPostsSlice.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
