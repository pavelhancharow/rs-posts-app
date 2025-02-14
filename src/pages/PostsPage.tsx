import { memo } from 'react';
import { Outlet } from 'react-router';
import PostsSelectionBar from '../components/PostsSelectionBar/PostsSelectionBar.tsx';
import PaginationLayout from '../components/PaginationLayout/PaginationLayout.tsx';
import PostsListLayout from '../components/PostsListLayout/PostsListLayout.tsx';
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
        <PaginationLayout />
      </SearchQueryContextProvider>
      <PostsSelectionBar />
    </>
  );
}

export default memo(PostsPage);
