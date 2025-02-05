import { useContext, MouseEvent } from 'react';
import { useNavigate } from 'react-router';
import { SearchContext } from '../../context/SearchContext.tsx';
import { LoadingStatuses } from '../../enums';
import ErrorComponent from '../ErrorComponent/ErrorComponent.tsx';
import Loader from '../Loader/Loader.tsx';
import NoContent from '../NoContent/NoContent.tsx';
import PostPreview from '../PostPreview/PostPreview.tsx';
import style from './PostsList.module.css';

function PostsList() {
  const context = useContext(SearchContext);
  const navigate = useNavigate();

  function handleClick(e: MouseEvent<HTMLLIElement>) {
    const postId = +e.currentTarget.id;
    const post = context.posts.find((post) => post.id === postId);

    if (!post) return;

    const state = { userId: post.userId };
    navigate(`/posts?details=${postId}`, { state });
  }

  return (
    <div className={style['posts-list__body']}>
      {context.status === LoadingStatuses.Pending && <Loader />}
      {context.status === LoadingStatuses.Rejected && (
        <ErrorComponent info={context.error} />
      )}

      {context.status === LoadingStatuses.Fulfilled &&
        (context.posts.length ? (
          <ul className={style['posts-list__body__ul']}>
            {context.posts.map((post) => (
              <PostPreview key={post.id} {...post} onClick={handleClick} />
            ))}
          </ul>
        ) : (
          <NoContent />
        ))}
    </div>
  );
}

export default PostsList;
