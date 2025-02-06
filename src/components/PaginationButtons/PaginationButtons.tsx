import style from './PaginationButtons.module.css';

function PaginationButtons() {
  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, Math.min(1 - 2, 10 - 4));
    const endPage = Math.min(startPage + 4, 10);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          data-active={true}
          // onClick={() => onClick(i)}
          // disabled={disabled}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={style['pagination-buttons']}>
      <button>{'<'}</button>
      {renderPageButtons()}
      <button>{'>'}</button>
    </div>
  );
}

export default PaginationButtons;
