import { useContext, MouseEvent, useCallback, useRef, useEffect } from 'react';
import {
  SetURLSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import { PostsListContext } from '../../context/PostsListContext.tsx';
import { LoadingStatuses } from '../../enums';
import ErrorComponent from '../ErrorComponent/ErrorComponent.tsx';
import Loader from '../Loader/Loader.tsx';
import NoContent from '../NoContent/NoContent.tsx';
import PostPreview from '../PostPreview/PostPreview.tsx';
import style from './PostsList.module.css';

type RefSearchParams =
  | { search: string; setSearchParams: SetURLSearchParams }
  | undefined;

function PostsList() {
  const context = useContext(PostsListContext);
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const ref = useRef<RefSearchParams>();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();
      const postId = +e.currentTarget.id;

      const post = context.data.posts.find((post) => post.id === postId);

      if (!post) return;

      const state = { userId: post.userId };

      const _searchParams = new URLSearchParams(ref.current?.search);
      _searchParams.set('details', `${postId}`);
      ref.current?.setSearchParams(_searchParams);

      navigate(`/posts?${_searchParams}`, { state });
    },
    [navigate, context.data.posts]
  );

  useEffect(() => {
    ref.current = { search: location.search, setSearchParams };
  }, [location.search, setSearchParams]);

  return (
    <div className={style['posts-list__body']}>
      {context.status === LoadingStatuses.Pending && <Loader />}
      {context.status === LoadingStatuses.Rejected && (
        <ErrorComponent info={context.error} />
      )}

      {context.status === LoadingStatuses.Fulfilled &&
        (context.data.posts.length ? (
          <ul className={style['posts-list__body__ul']}>
            {context.data.posts.map((post) => (
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
