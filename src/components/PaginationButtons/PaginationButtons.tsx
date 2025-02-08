import { memo, useCallback, useContext, useMemo } from 'react';
import {
  PostsListContext,
  PostsListSearchQueryContext,
  PostsListUpdateSearchQueryContext,
} from '../../context/PostsListContext.tsx';
import { LoadingStatuses } from '../../enums';
import style from './PaginationButtons.module.css';

function PaginationButtons() {
  const context = useContext(PostsListContext);
  const searchQuery = useContext(PostsListSearchQueryContext);
  const updateSearchQuery = useContext(PostsListUpdateSearchQueryContext);

  const page = useMemo(
    () => Math.floor(searchQuery.skip / searchQuery.limit) + 1,
    [searchQuery.skip, searchQuery.limit]
  );
  const pages = useMemo(
    () => Math.ceil(context.data.total / searchQuery.limit),
    [context.data.total, searchQuery.limit]
  );

  const disabled = context.status === LoadingStatuses.Pending;

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
          disabled={disabled}
        >
          {i}
        </button>
      );
    }

    return buttons;
  }, [page, pages, disabled]);

  return (
    <div className={style['pagination-buttons']}>
      <button
        disabled={disabled || page === 1}
        onClick={() => handleClick(page - 1)}
      >
        {'<'}
      </button>
      {renderedPageButtons}
      <button
        disabled={disabled || pages === page}
        onClick={() => handleClick(page + 1)}
      >
        {'>'}
      </button>
    </div>
  );
}

export default memo(PaginationButtons);
