import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router';
import CloseIcon from '../../assets/close-icon.svg';
import style from './FullPostUI.module.css';

const className = style['full-post'].concat(' container');

interface PostCardWrapperProps {
  children: ReactNode;
}

function FullPostUI(props: PostCardWrapperProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  searchParams.delete('details');

  return (
    <div className={className}>
      <NavLink
        to={{ pathname: '/posts', search: searchParams.toString() }}
        className={style['full-post__close-button']}
      >
        <img src={CloseIcon} alt="close icon" />
      </NavLink>

      {props.children}
    </div>
  );
}

export default FullPostUI;
