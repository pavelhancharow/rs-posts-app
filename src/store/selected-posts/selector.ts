import { createSelector } from '@reduxjs/toolkit';
import { PostEntity } from '../../models';
import { RootState } from '../store';

export const selectedPostsState = (state: RootState) => state['selected-posts'];

export const getSelectedPostsForDownloadSelector = createSelector(
  selectedPostsState,
  (posts) =>
    posts.map(
      (post): Omit<PostEntity, 'id' | 'tags' | 'userId'> => ({
        title: post.title,
        views: post.views,
        body: post.body,
        reactions: post.reactions,
      })
    )
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
