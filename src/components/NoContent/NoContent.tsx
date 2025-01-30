import { Component } from 'react';
import { localStorageService } from '../../api';
import style from './NoContent.module.css';

class NoContent extends Component {
  render() {
    const searchTerm = localStorageService.searchTerm;

    return (
      <li className={style['no-content']}>
        No posts found for your search &#34;
        <span className={style['no-content_bold']}>{searchTerm}</span>&#34;
      </li>
    );
  }
}

export default NoContent;
