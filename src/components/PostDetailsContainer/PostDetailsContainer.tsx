import { QueryStatus } from '@reduxjs/toolkit/query';
import { useGetFullPostQuery } from '../../api';
import ErrorComponent from '../ErrorComponent/ErrorComponent.tsx';
import Loader from '../Loader/Loader.tsx';
import NoContent from '../NoContent/NoContent.tsx';
import PostDetails from '../PostDetails/PostDetails.tsx';
import style from './PostDetailsContainer.module.css';

interface PostDetailsContainerProps {
  postId: string;
}

function PostDetailsContainer(props: PostDetailsContainerProps) {
  const { data, error, status } = useGetFullPostQuery({ postId: props.postId });

  return (
    <div className={style['post-details__container']}>
      {status === QueryStatus.pending && <Loader />}
      {status === QueryStatus.rejected && <ErrorComponent info={error} />}

      {(status === QueryStatus.fulfilled ||
        status === QueryStatus.uninitialized) &&
        (data ? (
          <PostDetails {...data} />
        ) : (
          <NoContent message="Post not found" />
        ))}
    </div>
  );
}

export default PostDetailsContainer;
