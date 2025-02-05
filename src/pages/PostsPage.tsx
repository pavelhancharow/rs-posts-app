import { useState } from 'react';
import { Outlet } from 'react-router';
import CustomButton from '../components/CustomButton/CustomButton.tsx';
import MainContent from '../components/MainContent/MainContent.tsx';
import PostList from '../components/PostList/PostList.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import SearchContextProvider from '../context/SearchContext.tsx';

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
      <SearchContextProvider>
        <SearchBar />
        <MainContent left={<PostList />} right={<Outlet />} />
      </SearchContextProvider>
      <CustomButton onClick={throwAnError}>Throw An Error</CustomButton>
    </>
  );
}

export default PostsPage;
