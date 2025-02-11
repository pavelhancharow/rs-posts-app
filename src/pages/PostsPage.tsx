import { Outlet } from 'react-router';
import PaginationUI from '../components/PaginationUI/PaginationUI.tsx';
import PostsListUI from '../components/PostsListUI/PostsListUI.tsx';
import PostsList from '../components/PostsList/PostsList.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import PostsListContextProvider from '../context/PostsListContext.tsx';

function PostsPage() {
  return (
    <PostsListContextProvider>
      <SearchBar />
      <PostsListUI left={<PostsList />} right={<Outlet />} />
      <PaginationUI />
    </PostsListContextProvider>
  );
}

export default PostsPage;
