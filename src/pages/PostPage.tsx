import { memo } from 'react';
import FullPost from '../components/FullPost/FullPost.tsx';
import FullPostUI from '../components/FullPostUI/FullPostUI.tsx';

interface PostPageProps {
  details: string;
}

function PostPage(props: PostPageProps) {
  return (
    <FullPostUI>
      <FullPost postId={props.details} />
    </FullPostUI>
  );
}

export default memo(PostPage);
