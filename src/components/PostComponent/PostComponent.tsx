import { Component } from 'react';
import { Post } from '../../models';

type PostProps = Post;

class PostComponent extends Component<PostProps> {
  render() {
    return (
      <li>
        <span>{this.props.id}</span>
        <span>{this.props.title}</span>
        <span>{this.props.body}</span>
      </li>
    );
  }
}

export default PostComponent;
