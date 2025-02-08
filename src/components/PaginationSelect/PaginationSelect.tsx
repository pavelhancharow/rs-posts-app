import { ChangeEvent, useContext } from 'react';
import {
  PostsListContext,
  PostsListSearchQueryContext,
  PostsListUpdateSearchQueryContext,
} from '../../context/PostsListContext.tsx';
import { LoadingStatuses } from '../../enums';
import style from './PaginationSelect.module.css';

function PaginationSelect() {
  const context = useContext(PostsListContext);
  const searchQuery = useContext(PostsListSearchQueryContext);
  const updateSearchQuery = useContext(PostsListUpdateSearchQueryContext);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSearchQuery({ limit: +e.target.value });
  };

  return (
    <div className={style['pagination-select']}>
      per Page{' '}
      <select
        name="limit"
        value={searchQuery.limit}
        disabled={context.status === LoadingStatuses.Pending}
        onChange={handleChange}
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

export default PaginationSelect;
