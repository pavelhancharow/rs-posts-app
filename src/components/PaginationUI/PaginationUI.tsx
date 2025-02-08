import { useContext, useMemo } from 'react';
import { PostsListContext } from '../../context/PostsListContext.tsx';
import { LoadingStatuses } from '../../enums';
import PaginationButtons from '../PaginationButtons/PaginationButtons.tsx';
import PaginationCountInfo from '../PaginationCountInfo/PaginationCountInfo.tsx';
import PaginationSelect from '../PaginationSelect/PaginationSelect.tsx';
import style from './PaginationUI.module.css';

function PaginationUI() {
  const context = useContext(PostsListContext);

  const disabled = useMemo(
    () => context.status === LoadingStatuses.Pending,
    [context.status]
  );

  if (!context.data.posts.length) return null;

  return (
    <div className={style.pagination}>
      <div className={style.pagination__settings}>
        <PaginationSelect disabled={disabled} />
        <PaginationCountInfo
          skip={context.data.skip}
          total={context.data.total}
          limit={context.data.limit}
        />
      </div>

      <PaginationButtons disabled={disabled} total={context.data.total} />
    </div>
  );
}

export default PaginationUI;
