import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectedPostsState = (state: RootState) => state['selected-posts'];

const getSelectedPostsSelector = createSelector(selectedPostsState, (posts) =>
  posts.map((post) => post.id)
);

export const getSelectedPostSelector = (postId: number) =>
  createSelector(getSelectedPostsSelector, (posts) => posts.includes(postId));
