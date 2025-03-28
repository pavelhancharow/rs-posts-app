import FullPost from '../components/FullPost/FullPost.tsx';
import FullPostUI from '../components/FullPostUI/FullPostUI.tsx';
import FullPostContextProvider from '../context/FullPostContext.tsx';

interface PostPageProps {
  details: string;
}

function PostPage(props: PostPageProps) {
  return (
    <FullPostUI>
      <FullPostContextProvider postId={props.details}>
        <FullPost />
      </FullPostContextProvider>
    </FullPostUI>
  );
}

export default PostPage;
