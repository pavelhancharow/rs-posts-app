import { ReactNode } from 'react';
import { NavLink } from 'react-router';
import CloseIcon from '../../assets/close-icon.svg';
import style from './FullPostUI.module.css';

interface PostCardWrapperProps {
  children: ReactNode;
}

function FullPostUI(props: PostCardWrapperProps) {
  return (
    <div className={style['full-post']}>
      <NavLink to="/posts" className={style['full-post__close-button']}>
        <img src={CloseIcon} alt="close icon" />
      </NavLink>

      {props.children}
    </div>
  );
}

export default FullPostUI;
