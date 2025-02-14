import { memo, useMemo, useState } from 'react';
import CommentIcon from '../../assets/comment.svg';
import EyeIcon from '../../assets/eye.svg';
import HeartIcon from '../../assets/heart.svg';
import ThumbDownIcon from '../../assets/thumb_down.svg';
import ThumbUpIcon from '../../assets/thumb_up.svg';
import UserIcon from '../../assets/user-icon.svg';
import { FullPostCard } from '../../models';
import style from './PostDetails.module.css';

type PostDetailsProps = FullPostCard;

function PostDetails(props: PostDetailsProps) {
  const [hide, setHide] = useState(true);

  const handleClick = () => {
    setHide((state) => !state);
  };

  const tags = useMemo(() => {
    return props.post.tags.map((tag) => `#${tag}`).join(' ');
  }, [props.post.tags]);

  return (
    <div className={style['post-details']}>
      <div className={style['post-details__user']}>
        <div className={style['post-details__user__avatar']}>
          <img
            src={props.user.image}
            alt="avatar"
            onError={(e) => (e.currentTarget.src = UserIcon)}
          />
        </div>

        <div className={style['post-details__user__bio']}>
          <h3>
            {props.user.firstName} {props.user.lastName}
          </h3>
          <span>@{props.user.username}</span>
        </div>
      </div>

      <div className={style['post-details__post']}>
        <h4 className={style['post-details__post__title']}>
          {props.post.title}
        </h4>

        <p className={style['post-details__post__description']}>
          {props.post.body} {tags.length > 0 && <span>{tags}</span>}
        </p>

        <div className={style['post-details__post__meta']}>
          <div className={style['post-details__post__meta__block']}>
            <img src={EyeIcon} alt="views" />
            <span>{props.post.views}</span>
          </div>
          <div className={style['post-details__post__meta__block']}>
            <img src={ThumbUpIcon} alt="likes" />
            <span>{props.post.reactions.likes}</span>
          </div>
          <div className={style['post-details__post__meta__block']}>
            <img src={ThumbDownIcon} alt="dislikes" />
            <span>{props.post.reactions.dislikes}</span>
          </div>
          <div className={style['post-details__post__meta__block']}>
            <img src={CommentIcon} alt="comments" />
            {props.totalComments > 0 && <span>{props.totalComments}</span>}
          </div>
        </div>

        {props.totalComments > 0 ? (
          <div className={style['post-details__comments']}>
            <span
              className={style['post-details__comments__text']}
              data-type="button"
              onClick={handleClick}
            >
              {hide ? 'view' : 'hide'}{' '}
              {props.totalComments > 1
                ? `all ${props.totalComments} comments`
                : `${props.totalComments} comment`}
            </span>

            {!hide && (
              <ul className={style['post-details__comments__list']}>
                {props.comments.map((comment) => (
                  <li
                    key={comment.id}
                    className={style['post-details__comment']}
                  >
                    <span className={style['post-details__comment__user']}>
                      <b>@{comment.user.username}</b>{' '}
                      <span>{comment.body}</span>
                    </span>
                    <span className={style['post-details__comment__meta']}>
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
          <div className={style['post-details__comments__text']}>
            no comment left
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(PostDetails);
