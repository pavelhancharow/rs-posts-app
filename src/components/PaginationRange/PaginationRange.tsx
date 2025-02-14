import { memo } from 'react';
import style from './PaginationRange.module.css';

const className = style['pagination-range'].concat(' pagination-layout');

interface PaginationRangeProps {
  skip: number;
  limit: number;
  total: number;
}

function PaginationRange(props: PaginationRangeProps) {
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

export default memo(PaginationRange);
