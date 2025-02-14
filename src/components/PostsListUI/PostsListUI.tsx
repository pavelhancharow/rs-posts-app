import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import style from './PostsListUI.module.css';

const className = style['posts-list-layout'].concat(' container');

interface PostsListLayoutProps {
  children: ReactNode;
}

function PostsListLayout(props: PostsListLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const handleClick = () => {
    if (!searchParams.has('details')) return;

    searchParams.delete('details');
    navigate({ pathname: '/posts', search: searchParams.toString() });
  };

  return (
    <div
      className={className}
      data-details={searchParams.has('details')}
      onClick={handleClick}
    >
      <div className={style['posts-list-layout__header']}>
        <span className={style['posts-list-layout__header__title']}>Title</span>
        <span className={style['posts-list-layout__header__description']}>
          Description
        </span>
      </div>

      {props.children}
    </div>
  );
}

export default PostsListLayout;
