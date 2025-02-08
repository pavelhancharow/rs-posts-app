import { memo, MouseEvent, useMemo } from 'react';
import { Post } from '../../models';
import EyeIcon from '../../assets/eye.svg';
import ThumbUpIcon from '../../assets/thumb_up.svg';
import ThumbDownIcon from '../../assets/thumb_down.svg';
import style from './PostPreview.module.css';

type PostPreviewProps = Post & {
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
};

function PostPreview(props: PostPreviewProps) {
  const tags = useMemo(() => {
    return props.tags.map((tag) => `#${tag}`).join(' ');
  }, [props.tags]);

  return (
    <li
      id={`${props.id}`}
      className={style['post-preview']}
      onClick={props.onClick}
    >
      <h4 className={style['post-preview__title']}>{props.title}</h4>

      <div className={style['post-preview__description']}>
        <p className={style['post-preview__body']}>
          {props.body} {tags.length > 0 && <span>{tags}</span>}
        </p>

        <div className={style['post-preview__info']}>
          <div className={style['post-preview__info_container']}>
            <img src={EyeIcon} alt="views" />
            <span>{props.views}</span>
          </div>
          <div className={style['post-preview__info_container']}>
            <img src={ThumbUpIcon} alt="likes" />
            <span>{props.reactions.likes}</span>
          </div>
          <div className={style['post-preview__info_container']}>
            <img src={ThumbDownIcon} alt="dislikes" />
            <span>{props.reactions.dislikes}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(PostPreview);
