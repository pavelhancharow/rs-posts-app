import { useContext } from 'react';
import { FullPostContext } from '../../context/FullPostContext.tsx';
import { LoadingStatuses } from '../../enums';
import ErrorComponent from '../ErrorComponent/ErrorComponent.tsx';
import Loader from '../Loader/Loader.tsx';
import NoContent from '../NoContent/NoContent.tsx';
import FullPostContent from '../FullPostContent/FullPostContent.tsx';
import style from './FullPost.module.css';

function FullPost() {
  const context = useContext(FullPostContext);

  return (
    <div className={style['full-post__content']}>
      {context.status === LoadingStatuses.Pending && <Loader />}
      {context.status === LoadingStatuses.Rejected && (
        <ErrorComponent info={context.error} />
      )}

      {(context.status === LoadingStatuses.Fulfilled ||
        context.status === LoadingStatuses.Idle) &&
        (context.card ? (
          <FullPostContent {...context.card} />
        ) : (
          <NoContent message="Post not found" />
        ))}
    </div>
  );
}

export default FullPost;
