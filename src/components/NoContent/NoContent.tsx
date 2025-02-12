import { localStorageService } from '../../services';
import style from './NoContent.module.css';

interface NoContentProps {
  message?: string;
}

function NoContent(props: NoContentProps) {
  const searchTerm = props.message || localStorageService.searchParams.q;

  return (
    <div className={style['no-content']}>
      {props.message ? (
        searchTerm
      ) : (
        <>
          No posts found for your search &#34;
          <span className={style['no-content_bold']}>{searchTerm}</span>&#34;
        </>
      )}
    </div>
  );
}

export default NoContent;
