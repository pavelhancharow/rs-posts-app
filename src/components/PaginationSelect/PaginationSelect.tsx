import style from './PaginationSelect.module.css';

function PaginationSelect() {
  return (
    <div className={style['pagination-select']}>
      per Page{' '}
      <select name="limit">
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
    </div>
  );
}

export default PaginationSelect;
