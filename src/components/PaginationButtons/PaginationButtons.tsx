import { memo, useCallback, useContext, useMemo } from 'react';
import {
  PostsListSearchQueryContext,
  PostsListUpdateSearchQueryContext,
} from '../../context/PostsListContext.tsx';
import style from './PaginationButtons.module.css';

interface PaginationButtonsProps {
  total: number;
  disabled: boolean;
}

function PaginationButtons(props: PaginationButtonsProps) {
  const searchQuery = useContext(PostsListSearchQueryContext);
  const updateSearchQuery = useContext(PostsListUpdateSearchQueryContext);

  const page = useMemo(
    () => Math.floor(searchQuery.skip / searchQuery.limit) + 1,
    [searchQuery.skip, searchQuery.limit]
  );
  const pages = useMemo(
    () => Math.ceil(props.total / searchQuery.limit),
    [props.total, searchQuery.limit]
  );

  const handleClick = useCallback(
    (numberOfPage: number) => {
      updateSearchQuery({ skip: (numberOfPage - 1) * searchQuery.limit });
    },
    [updateSearchQuery, searchQuery.limit]
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
          role="button"
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
        role="button"
      >
        {'<'}
      </button>
      {renderedPageButtons}
      <button
        disabled={props.disabled || pages === page}
        onClick={() => handleClick(page + 1)}
        role="button"
      >
        {'>'}
      </button>
    </div>
  );
}

export default memo(PaginationButtons);
