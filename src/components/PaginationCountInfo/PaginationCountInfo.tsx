import style from './PaginationCountInfo.module.css';

function PaginationCountInfo() {
  return (
    <div className={style['pagination-count-info']}>
      <span className={style['pagination-count-info__current']}>
        {1} - {30}
      </span>{' '}
      of <span className={style['pagination-count-info__total']}>{50}</span>
    </div>
  );
}

export default PaginationCountInfo;
