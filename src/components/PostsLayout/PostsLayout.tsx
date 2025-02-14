import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { getSelectedPostsVisibleSelector } from '../../store/selected-posts/selector.ts';
import style from './PostsLayout.module.css';

interface PostsLayoutProps {
  children: ReactNode;
}

function PostsLayout(props: PostsLayoutProps) {
  const isSelectedVisible = useSelector(getSelectedPostsVisibleSelector);

  return (
    <div className={style['posts-layout']} data-visible={isSelectedVisible}>
      {props.children}
    </div>
  );
}

export default PostsLayout;
