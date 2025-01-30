import { Component, ContextType } from 'react';
import { SearchContext } from '../../context/SearchContext.tsx';
import { LoadingStatuses } from '../../enums';
import Loader from '../Loader/Loader.tsx';
import NoContent from '../NoContent/NoContent.tsx';
import PostComponent from '../PostComponent/PostComponent.tsx';
import style from './PostList.module.css';

class PostList extends Component {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  render() {
    const { posts, status, error } = this.context;

    return (
      <ul className={style['post-list']}>
        {status === LoadingStatuses.Pending && <Loader />}
        {status === LoadingStatuses.Rejected && <div>{error}</div>}
        {status === LoadingStatuses.Fulfilled &&
          (posts.length ? (
            posts.map((post) => <PostComponent key={post.id} {...post} />)
          ) : (
            <NoContent />
          ))}
      </ul>
    );
  }
}

export default PostList;
