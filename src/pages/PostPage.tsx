import FullPost from '../components/FullPost/FullPost.tsx';
import FullPostUI from '../components/FullPostUI/FullPostUI.tsx';
import FullPostContextProvider from '../context/FullPostContextProvider.tsx';

function PostPage() {
  return (
    <FullPostUI>
      <FullPostContextProvider>
        <FullPost />
      </FullPostContextProvider>
    </FullPostUI>
  );
}

export default PostPage;
