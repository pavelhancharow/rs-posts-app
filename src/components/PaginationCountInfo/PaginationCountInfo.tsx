import { memo } from 'react';
import style from './PaginationCountInfo.module.css';

const className = style['pagination-count-info'].concat(' pagination-layout');

interface PaginationCountInfoProps {
  skip: number;
  limit: number;
  total: number;
}

function PaginationCountInfo(props: PaginationCountInfoProps) {
  const from = props.skip + 1;
  const to = props.skip + props.limit;

  return (
    <div>
      <span className={className}>
        {from} - {to}
      </span>{' '}
      of <span className={className}>{props.total}</span>
    </div>
  );
}

export default memo(PaginationCountInfo);
