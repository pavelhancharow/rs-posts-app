import PaginationButtons from '../PaginationButtons/PaginationButtons.tsx';
import PaginationCountInfo from '../PaginationCountInfo/PaginationCountInfo.tsx';
import PaginationSelect from '../PaginationSelect/PaginationSelect.tsx';
import style from './PaginationUI.module.css';

function PaginationUi() {
  return (
    <div className={style.pagination}>
      <div className={style.pagination__settings}>
        <PaginationCountInfo />
        <PaginationSelect />
      </div>

      <PaginationButtons />
    </div>
  );
}

export default PaginationUi;
