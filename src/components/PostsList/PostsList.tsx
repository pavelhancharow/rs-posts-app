import { QueryStatus } from '@reduxjs/toolkit/query';
import { MouseEvent, useCallback, useRef, useEffect, useContext } from 'react';
import {
  SetURLSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import { PostsListSearchQueryContext } from '../../context/PostsListContext.tsx';
import { useGetAllPostsQuery } from '../../api';
import ErrorComponent from '../ErrorComponent/ErrorComponent.tsx';
import Loader from '../Loader/Loader.tsx';
import NoContent from '../NoContent/NoContent.tsx';
import PostPreview from '../PostPreview/PostPreview.tsx';
import style from './PostsList.module.css';

type RefSearchParams =
  | { search: string; setSearchParams: SetURLSearchParams }
  | undefined;

function PostsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const ref = useRef<RefSearchParams>();
  const searchQuery = useContext(PostsListSearchQueryContext);
  const { data, error, status } = useGetAllPostsQuery(searchQuery);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();
      const postId = +e.currentTarget.id;

      const post = data?.posts.find((post) => post.id === postId);

      if (!post) return;

      const state = { userId: post.userId };

      const _searchParams = new URLSearchParams(ref.current?.search);
      _searchParams.set('details', `${postId}`);
      ref.current?.setSearchParams(_searchParams);

      navigate(`/posts?${_searchParams}`, { state });
    },
    [navigate, data?.posts]
  );

  useEffect(() => {
    ref.current = { search: location.search, setSearchParams };
  }, [location.search, setSearchParams]);

  return (
    <div className={style['posts-list__body']}>
      {status === QueryStatus.pending && <Loader />}
      {status === QueryStatus.rejected && <ErrorComponent info={error} />}

      {status === QueryStatus.fulfilled &&
        (data?.posts.length ? (
          <ul className={style['posts-list__body__ul']}>
            {data.posts.map((post) => (
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
