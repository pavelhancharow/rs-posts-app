import { memo } from 'react';
import { Outlet } from 'react-router';
import PostsSelectionBar from '../components/Flyout/PostsSelectionBar.tsx';
import PaginationUI from '../components/PaginationUI/PaginationUI.tsx';
import PostsListLayout from '../components/PostsListUI/PostsListUI.tsx';
import PostsLayout from '../components/PostsLayout/PostsLayout.tsx';
import PostsList from '../components/PostsList/PostsList.tsx';
import Toolbar from '../components/Toolbar/Toolbar.tsx';
import SearchQueryContextProvider from '../context/SearchQueryContext';

function PostsPage() {
  return (
    <>
      <SearchQueryContextProvider>
        <Toolbar />
        <PostsLayout>
          <PostsListLayout>
            <PostsList />
          </PostsListLayout>
          <Outlet />
        </PostsLayout>
        <PaginationUI />
      </SearchQueryContextProvider>
      <PostsSelectionBar />
    </>
  );
}

export default memo(PostsPage);
