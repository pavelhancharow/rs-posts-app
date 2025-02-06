import { useState } from 'react';
import { Outlet } from 'react-router';
import CustomButton from '../components/CustomButton/CustomButton.tsx';
import PaginationUi from '../components/PaginationUI/PaginationUI.tsx';
import PostsListUI from '../components/PostsListUI/PostsListUI.tsx';
import PostsList from '../components/PostsList/PostsList.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import PostsListContextProvider from '../context/PostsListContext.tsx';

interface PostsPageState {
  triggerError: boolean;
}

function PostsPage() {
  const [state, setState] = useState<PostsPageState>({ triggerError: false });

  const throwAnError = () => {
    setState({ triggerError: true });
  };

  if (state.triggerError) throw new Error('Error during button click!');

  return (
    <>
      <PostsListContextProvider>
        <SearchBar />
        <PostsListUI left={<PostsList />} right={<Outlet />} />
        <PaginationUi />
      </PostsListContextProvider>
      <CustomButton onClick={throwAnError}>Throw An Error</CustomButton>
    </>
  );
}

export default PostsPage;
