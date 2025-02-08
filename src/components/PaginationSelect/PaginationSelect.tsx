import { ChangeEvent, memo, useContext } from 'react';
import {
  PostsListSearchQueryContext,
  PostsListUpdateSearchQueryContext,
} from '../../context/PostsListContext.tsx';
import style from './PaginationSelect.module.css';

interface PaginationSelectProps {
  disabled: boolean;
}

function PaginationSelect(props: PaginationSelectProps) {
  const searchQuery = useContext(PostsListSearchQueryContext);
  const updateSearchQuery = useContext(PostsListUpdateSearchQueryContext);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSearchQuery({ limit: +e.target.value, skip: 0 });
  };

  return (
    <div className={style['pagination-select']}>
      per Page{' '}
      <select
        name="limit"
        value={searchQuery.limit}
        disabled={props.disabled}
        onChange={handleChange}
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

export default memo(PaginationSelect);
