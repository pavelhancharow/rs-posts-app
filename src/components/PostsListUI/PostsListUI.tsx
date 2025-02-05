import { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import style from './PostsListUI.module.css';

interface MainContentProps {
  left: ReactNode;
  right: ReactNode;
}

function PostsListUI(props: MainContentProps) {
  const [searchParams] = useSearchParams();
  const details = searchParams.get('details');

  return (
    <div className={style['posts-list__main']}>
      <div className={style['posts-list__wrapper']} data-details={!!details}>
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
