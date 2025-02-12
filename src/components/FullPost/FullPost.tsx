import { QueryStatus } from '@reduxjs/toolkit/query';
import { useGetFullPostQuery } from '../../api';
import ErrorComponent from '../ErrorComponent/ErrorComponent.tsx';
import Loader from '../Loader/Loader.tsx';
import NoContent from '../NoContent/NoContent.tsx';
import FullPostContent from '../FullPostContent/FullPostContent.tsx';
import style from './FullPost.module.css';

interface FullPostProps {
  postId: string;
}

function FullPost(props: FullPostProps) {
  const { data, error, status } = useGetFullPostQuery({ postId: props.postId });

  return (
    <div className={style['full-post__content']}>
      {status === QueryStatus.pending && <Loader />}
      {status === QueryStatus.rejected && <ErrorComponent info={error} />}

      {(status === QueryStatus.fulfilled ||
        status === QueryStatus.uninitialized) &&
        (data ? (
          <FullPostContent {...data} />
        ) : (
          <NoContent message="Post not found" />
        ))}
    </div>
  );
}

export default FullPost;
