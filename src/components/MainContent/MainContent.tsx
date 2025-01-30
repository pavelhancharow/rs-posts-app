import { Component } from 'react';
import PostList from '../PostList/PostList.tsx';
import style from './MainContent.module.css';

class MainContent extends Component {
  render() {
    return (
      <div className={style.main}>
        <div>
          <span>Post Title</span>
          <span>Post Description</span>
        </div>

        <PostList />
      </div>
    );
  }
}

export default MainContent;
