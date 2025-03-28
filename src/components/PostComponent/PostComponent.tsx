import { Component } from 'react';
import { Post } from '../../models';
import style from './PostComponent.module.css';
import CommentIcon from '../../assets/comment.svg';
import EyeIcon from '../../assets/eye.svg';
import HeartIcon from '../../assets/heart.svg';

type PostProps = Post;

class PostComponent extends Component<PostProps> {
  render() {
    return (
      <li className={style.post}>
        <span className={style.post__title}>{this.props.title}</span>
        <div className={style.post__body}>
          <span className={style.post__text}>{this.props.body}</span>
          <div className={style.post__info}>
            <div className={style.post__info_container}>
              <img src={EyeIcon} alt="views" />
              <span>{this.props.views}</span>
            </div>
            <div className={style.post__info_container}>
              <img src={HeartIcon} alt="likes" />
              <span>{this.props.reactions.likes}</span>
            </div>
            <div className={style.post__info_container}>
              <img src={CommentIcon} alt="comments" />
              <span>{this.props.reactions.dislikes}</span>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default PostComponent;
