import { QueryStatus } from '@reduxjs/toolkit/query';
import { useContext, useMemo } from 'react';
import { SearchQueryContext } from '../../context';
import { useGetAllPostsQuery } from '../../api';
import PaginationButtons from '../PaginationButtons/PaginationButtons.tsx';
import PaginationCountInfo from '../PaginationRange/PaginationRange.tsx';
import PaginationSelect from '../PaginationSelect/PaginationSelect.tsx';
import style from './PaginationLayout.module.css';

const className = style['pagination-layout'].concat(' container');

function PaginationLayout() {
  const searchQuery = useContext(SearchQueryContext);
  const { data, status } = useGetAllPostsQuery(searchQuery);

  const disabled = useMemo(() => status === QueryStatus.pending, [status]);

  if (!data?.posts.length) return null;

  return (
    <div className={className}>
      <div className={style['pagination-layout__settings']}>
        <PaginationSelect disabled={disabled} limit={searchQuery.limit} />
        <PaginationCountInfo
          skip={data.skip}
          total={data.total}
          limit={data.limit}
        />
      </div>

      <PaginationButtons
        disabled={disabled}
        total={data.total}
        limit={searchQuery.limit}
        skip={searchQuery.skip}
      />
    </div>
  );
}

export default PaginationLayout;
