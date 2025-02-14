import { memo } from 'react';
import PostDetailsContainer from '../components/PostDetailsContainer/PostDetailsContainer.tsx';
import PostDetailsLayout from '../components/PostDetailsLayout/PostDetailsLayout.tsx';

interface PostPageProps {
  details: string;
}

function PostPage(props: PostPageProps) {
  return (
    <PostDetailsLayout>
      <PostDetailsContainer postId={props.details} />
    </PostDetailsLayout>
  );
}

export default memo(PostPage);
