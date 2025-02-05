import { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import style from './MainContent.module.css';

interface MainContentProps {
  left: ReactNode;
  right: ReactNode;
}

function MainContent(props: MainContentProps) {
  const [searchParams] = useSearchParams();
  const details = searchParams.get('details');

  return (
    <div className={style['posts-list_wrapper']}>
      <div className={style['posts-list']} data-details={!!details}>
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

export default MainContent;
