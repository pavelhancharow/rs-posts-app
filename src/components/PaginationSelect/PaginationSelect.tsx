import { ChangeEvent, memo, useContext } from 'react';
import { SearchQueryDispatchContext } from '../../context';
import style from './PaginationSelect.module.css';

interface PaginationSelectProps {
  disabled: boolean;
  limit: number;
}

function PaginationSelect(props: PaginationSelectProps) {
  const updateSearchQuery = useContext(SearchQueryDispatchContext);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSearchQuery({ limit: +e.target.value, skip: 0 });
  };

  return (
    <div className={style['pagination-select']}>
      per Page{' '}
      <select
        role="select"
        name="limit"
        value={props.limit}
        disabled={props.disabled}
        onChange={handleChange}
        className="pagination-layout"
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

export default memo(PaginationSelect);
