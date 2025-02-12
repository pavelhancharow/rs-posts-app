import { memo, useCallback, useContext, useMemo } from 'react';
import { SearchQueryDispatchContext } from '../../context';
import style from './PaginationButtons.module.css';

interface PaginationButtonsProps {
  skip: number;
  limit: number;
  total: number;
  disabled: boolean;
}

function PaginationButtons(props: PaginationButtonsProps) {
  const updateSearchQuery = useContext(SearchQueryDispatchContext);

  const page = useMemo(
    () => Math.floor(props.skip / props.limit) + 1,
    [props.skip, props.limit]
  );
  const pages = useMemo(
    () => Math.ceil(props.total / props.limit),
    [props.total, props.limit]
  );

  const handleClick = useCallback(
    (numberOfPage: number) => {
      updateSearchQuery({ skip: (numberOfPage - 1) * props.limit });
    },
    [updateSearchQuery, props.limit]
  );

  const renderedPageButtons = useMemo(() => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - 2);
    const endPage = Math.min(startPage + maxVisiblePages - 1, pages);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - (maxVisiblePages - 1));
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          data-active={i === page}
          onClick={() => handleClick(i)}
          disabled={props.disabled}
        >
          {i}
        </button>
      );
    }

    return buttons;
  }, [page, pages, props.disabled, handleClick]);

  return (
    <div className={style['pagination-buttons']}>
      <button
        disabled={props.disabled || page === 1}
        onClick={() => handleClick(page - 1)}
      >
        {'<'}
      </button>
      {renderedPageButtons}
      <button
        disabled={props.disabled || pages === page}
        onClick={() => handleClick(page + 1)}
      >
        {'>'}
      </button>
    </div>
  );
}

export default memo(PaginationButtons);
