import { MouseEvent } from 'react';
import { Post } from '../../models';
import style from './PostComponent.module.css';
import EyeIcon from '../../assets/eye.svg';
import ThumbUpIcon from '../../assets/thumb_up.svg';
import ThumbDownIcon from '../../assets/thumb_down.svg';

type PostComponentProps = Post & {
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
};

function PostComponent(props: PostComponentProps) {
  return (
    <li id={`${props.id}`} className={style.post} onClick={props.onClick}>
      <span className={style.post__title}>{props.title}</span>
      <div className={style.post__body}>
        <p className={style.post__text}>{props.body}</p>
        <div className={style.post__info}>
          <div className={style.post__info_container}>
            <img src={EyeIcon} alt="views" />
            <span>{props.views}</span>
          </div>
          <div className={style.post__info_container}>
            <img src={ThumbUpIcon} alt="likes" />
            <span>{props.reactions.likes}</span>
          </div>
          <div className={style.post__info_container}>
            <img src={ThumbDownIcon} alt="dislikes" />
            <span>{props.reactions.dislikes}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default PostComponent;
