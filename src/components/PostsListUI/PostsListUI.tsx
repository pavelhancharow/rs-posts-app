import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import style from './PostsListUI.module.css';

interface MainContentProps {
  left: ReactNode;
  right: ReactNode;
}

function PostsListUI(props: MainContentProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const handleClick = () => {
    if (!searchParams.has('details')) return;

    searchParams.delete('details');
    navigate({ pathname: '/posts', search: searchParams.toString() });
  };

  return (
    <div className={style['posts-list__main']}>
      <div
        className={style['posts-list__wrapper']}
        data-details={searchParams.has('details')}
        onClick={handleClick}
      >
        <div className={style['posts-list__header']}>
          <span className={style['posts-list__header__title']}>Title</span>
          <span className={style['posts-list__header__description']}>
            Description
          </span>
        </div>

        {props.left}
      </div>
      {props.right}
    </div>
  );
}

export default PostsListUI;
