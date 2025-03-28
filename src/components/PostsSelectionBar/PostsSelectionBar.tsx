import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getSelectedPostsForDownloadSelector } from '../../store/selected-posts/selectors.ts';
import { selectedPostsActions } from '../../store/selected-posts/slice.ts';
import { useAppDispatch } from '../../store/store.ts';
import CustomButton from '../CustomButton/CustomButton.tsx';
import style from './PostsSelectionBar.module.css';

const className = style['posts-selection-bar'].concat(' container');

function PostsSelectionBar() {
  const ref = useRef<HTMLAnchorElement>(null);
  const selectedPosts = useSelector(getSelectedPostsForDownloadSelector);
  const dispatch = useAppDispatch();

  if (!selectedPosts.length) return null;

  const handleUnselect = () => {
    dispatch(selectedPostsActions.unselectAllPosts());
  };

  const handleDownload = () => {
    if (ref.current === null) return;

    const anchor = ref.current;

    const csvRows = [
      ['Title', 'Views', 'Likes', 'Dislikes', 'Description'].join(','),
      ...selectedPosts.map((post) =>
        [
          `"${post.title}"`,
          `"${post.views}"`,
          `"${post.reactions.likes}"`,
          `"${post.reactions.dislikes}"`,
          `"${post.body}"`,
        ].join(',')
      ),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);

    const count = selectedPosts.length;
    const category = count === 1 ? 'post' : 'posts';

    const fileName = `${count}_${category}.csv`;

    anchor.setAttribute('href', encodedUri);
    anchor.setAttribute('download', fileName);

    anchor.click();

    setTimeout(() => {
      anchor.setAttribute('href', '#');
      anchor.removeAttribute('download');
    }, 100);
  };

  return (
    <div className={className}>
      <span>Selected Posts: {selectedPosts.length}</span>
      <div>
        <CustomButton onClick={handleUnselect}>Unselect all</CustomButton>
        <CustomButton onClick={handleDownload}>Download</CustomButton>
      </div>
      <a ref={ref} href="#" />
    </div>
  );
}

export default PostsSelectionBar;
