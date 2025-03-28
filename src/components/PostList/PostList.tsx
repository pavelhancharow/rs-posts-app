import { Component, ContextType } from 'react';
import { SearchContext } from '../../context/SearchContext.tsx';
import { LoadingStatuses } from '../../enums';
import ErrorComponent from '../ErrorComponent/ErrorComponent.tsx';
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
      <div className={style.posts}>
        {status === LoadingStatuses.Pending && <Loader />}
        {status === LoadingStatuses.Rejected && <ErrorComponent info={error} />}

        {status === LoadingStatuses.Fulfilled &&
          (posts.length ? (
            <ul className={style['posts-list']}>
              {posts.map((post) => (
                <PostComponent key={post.id} {...post} />
              ))}
            </ul>
          ) : (
            <NoContent />
          ))}
      </div>
    );
  }
}

export default PostList;
