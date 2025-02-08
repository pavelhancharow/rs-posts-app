import { useContext } from 'react';
import { PostsListContext } from '../../context/PostsListContext.tsx';
import style from './PaginationCountInfo.module.css';

function PaginationCountInfo() {
  const context = useContext(PostsListContext);
  const from = context.data.skip + 1;
  const to = context.data.skip + context.data.limit;

  return (
    <div className={style['pagination-count-info']}>
      <span className={style['pagination-count-info__current']}>
        {from} - {to}
      </span>{' '}
      of{' '}
      <span className={style['pagination-count-info__total']}>
        {context.data.total}
      </span>
    </div>
  );
}

export default PaginationCountInfo;
