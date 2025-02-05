import { useState } from 'react';
import CommentIcon from '../../assets/comment.svg';
import EyeIcon from '../../assets/eye.svg';
import HeartIcon from '../../assets/heart.svg';
import ThumbDownIcon from '../../assets/thumb_down.svg';
import ThumbUpIcon from '../../assets/thumb_up.svg';
import UserIcon from '../../assets/user-icon.svg';
import { FullPostCard } from '../../models';
import style from './FullPostContent.module.css';

type FullPostContentProps = FullPostCard;

function FullPostContent(props: FullPostContentProps) {
  const [hide, setHide] = useState(true);

  const handleClick = () => {
    setHide((state) => !state);
  };

  return (
    <div className={style['full-post__content']}>
      <div className={style['full-post__user']}>
        <div className={style['full-post__user__avatar']}>
          <img
            src={props.user.image}
            alt="avatar"
            onError={(e) => (e.currentTarget.src = UserIcon)}
          />
        </div>

        <div className={style['full-post__user__bio']}>
          <h3>
            {props.user.firstName} {props.user.lastName}
          </h3>
          <span>@{props.user.username}</span>
        </div>
      </div>

      <div className={style['full-post__post']}>
        <h4 className={style['full-post__post__title']}>{props.post.title}</h4>

        <p className={style['full-post__post__description']}>
          {props.post.body}{' '}
          {props.post.tags.length > 0 && (
            <span>{props.post.tags.map((tag) => `#${tag}`).join(' ')}</span>
          )}
        </p>

        <div className={style['full-post__post__meta']}>
          <div className={style['full-post__post__meta__block']}>
            <img src={EyeIcon} alt="views" />
            <span>{props.post.views}</span>
          </div>
          <div className={style['full-post__post__meta__block']}>
            <img src={ThumbUpIcon} alt="likes" />
            <span>{props.post.reactions.likes}</span>
          </div>
          <div className={style['full-post__post__meta__block']}>
            <img src={ThumbDownIcon} alt="dislikes" />
            <span>{props.post.reactions.dislikes}</span>
          </div>
          <div className={style['full-post__post__meta__block']}>
            <img src={CommentIcon} alt="comments" />
            {props.totalComments > 0 && <span>{props.totalComments}</span>}
          </div>
        </div>

        {props.totalComments > 0 ? (
          <div className={style['full-post__comments']}>
            <span
              className={style['full-post__comments__text']}
              data-type="button"
              onClick={handleClick}
            >
              {hide ? 'view' : 'hide'}{' '}
              {props.totalComments > 1
                ? `all ${props.totalComments} comments`
                : `${props.totalComments} comment`}
            </span>

            {!hide && (
              <ul className={style['full-post__comments__list']}>
                {props.comments.map((comment) => (
                  <li key={comment.id} className={style['full-post__comment']}>
                    <span className={style['full-post__comment__user']}>
                      <b>@{comment.user.username}</b>{' '}
                      <span>{comment.body}</span>
                    </span>
                    <span className={style['full-post__comment__meta']}>
                      <img src={HeartIcon} alt="likes" />
                      {comment.likes > 1
                        ? `${comment.likes} likes`
                        : comment.likes === 1
                          ? `${comment.likes} like`
                          : null}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className={style['full-post__comments__text']}>
            no comment left
          </div>
        )}
      </div>
    </div>
  );
}

export default FullPostContent;
