import { Component } from 'react';
import { localStorageService } from '../../api';

class NoContent extends Component {
  render() {
    const searchTerm = localStorageService.searchTerm;

    return <li>No posts found for your search &#34;{searchTerm}&#34;</li>;
  }
}

export default NoContent;
