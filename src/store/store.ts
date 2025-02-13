import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { apiPostsSlice } from '../api';
import {
  selectedPostsKey,
  selectedPostsReducer,
} from './selected-posts/slice.ts';

const rootReducer = combineReducers({
  [apiPostsSlice.reducerPath]: apiPostsSlice.reducer,
  [selectedPostsKey]: selectedPostsReducer,
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

export const useAppDispatch: () => AppDispatch = useDispatch;
