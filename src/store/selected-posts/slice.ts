import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../models';

const selectedPostsSlice = createSlice({
  name: 'selected-posts',
  initialState: [] as Post[],
  reducers: {
    selectPost: (state, actions) => {
      return [...state, actions.payload].sort((a, b) => a.id - b.id);
    },
    unselectPost: (state, actions) => {
      return state.filter((post) => post.id !== actions.payload);
    },
  },
});

const {
  actions: selectedPostsActions,
  reducer: selectedPostsReducer,
  name: selectedPostsKey,
} = selectedPostsSlice;

export { selectedPostsReducer, selectedPostsKey, selectedPostsActions };
