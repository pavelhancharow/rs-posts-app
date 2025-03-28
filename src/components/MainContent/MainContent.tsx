import { Component } from 'react';
import PostList from '../PostList/PostList.tsx';
import style from './MainContent.module.css';

class MainContent extends Component {
  render() {
    return (
      <div className={style.main}>
        <div className={style.main__header}>
          <span className={style.main__header__title}>Title</span>
          <span className={style.main__header__body}>Description</span>
        </div>

        <PostList />
      </div>
    );
  }
}

export default MainContent;
