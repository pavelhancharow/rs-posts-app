import { memo } from 'react';
import { Outlet } from 'react-router';
import Flyout from '../components/Flyout/Flyout.tsx';
import PaginationUI from '../components/PaginationUI/PaginationUI.tsx';
import PostsListUI from '../components/PostsListUI/PostsListUI.tsx';
import PostsList from '../components/PostsList/PostsList.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import SearchQueryContextProvider from '../context/SearchQueryContext';

function PostsPage() {
  return (
    <>
      <SearchQueryContextProvider>
        <SearchBar />
        <PostsListUI left={<PostsList />} right={<Outlet />} />
        <PaginationUI />
      </SearchQueryContextProvider>
      <Flyout />
    </>
  );
}

export default memo(PostsPage);
