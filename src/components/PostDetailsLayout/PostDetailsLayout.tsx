import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router';
import CloseIcon from '../../assets/close-icon.svg';
import style from './PostDetailsLayout.module.css';

const className = style['post-details-layout'].concat(' container');

interface PostDetailsLayoutProps {
  children: ReactNode;
}

function PostDetailsLayout(props: PostDetailsLayoutProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  searchParams.delete('details');

  return (
    <div className={className}>
      <NavLink
        to={{ pathname: '/posts', search: searchParams.toString() }}
        className={style['post-details-layout__close-button']}
      >
        <img src={CloseIcon} alt="close icon" />
      </NavLink>

      {props.children}
    </div>
  );
}

export default PostDetailsLayout;
