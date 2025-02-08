import PaginationButtons from '../PaginationButtons/PaginationButtons.tsx';
import PaginationCountInfo from '../PaginationCountInfo/PaginationCountInfo.tsx';
import PaginationSelect from '../PaginationSelect/PaginationSelect.tsx';
import style from './PaginationUI.module.css';

function PaginationUI() {
  return (
    <div className={style.pagination}>
      <div className={style.pagination__settings}>
        <PaginationSelect />
        <PaginationCountInfo />
      </div>

      <PaginationButtons />
    </div>
  );
}

export default PaginationUI;
