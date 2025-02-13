import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectedPostsState = (state: RootState) => state['selected-posts'];

export const getSelectedPostsSelector = createSelector(
  selectedPostsState,
  (posts) => posts
);

const getSelectedPostsIdSelector = createSelector(selectedPostsState, (posts) =>
  posts.map((post) => post.id)
);

export const getSelectedPostSelector = (postId: number) =>
  createSelector(getSelectedPostsIdSelector, (posts) => posts.includes(postId));

export const getSelectedPostsVisibleSelector = createSelector(
  selectedPostsState,
  (posts) => posts.length > 0
);
