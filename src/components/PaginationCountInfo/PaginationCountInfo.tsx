import { memo } from 'react';
import style from './PaginationCountInfo.module.css';

interface PaginationCountInfoProps {
  skip: number;
  limit: number;
  total: number;
}

function PaginationCountInfo(props: PaginationCountInfoProps) {
  const from = props.skip + 1;
  const to = props.skip + props.limit;

  return (
    <div className={style['pagination-count-info']}>
      <span className={style['pagination-count-info__current']}>
        {from} - {to}
      </span>{' '}
      of{' '}
      <span className={style['pagination-count-info__total']}>
        {props.total}
      </span>
    </div>
  );
}

export default memo(PaginationCountInfo);
