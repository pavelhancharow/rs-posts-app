import {
  ChangeEvent,
  memo,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { Post } from '../../models';
import EyeIcon from '../../assets/eye.svg';
import ThumbUpIcon from '../../assets/thumb_up.svg';
import ThumbDownIcon from '../../assets/thumb_down.svg';
import { getSelectedPostSelector } from '../../store/selected-posts/selector.ts';
import { selectedPostsActions } from '../../store/selected-posts/slice.ts';
import { useAppDispatch } from '../../store/store.ts';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox.tsx';
import style from './PostPreview.module.css';

type PostPreviewProps = Post & {
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
};

function PostPreview({ onClick, ...props }: PostPreviewProps) {
  const dispatch = useAppDispatch();
  const ref = useRef(props);
  const selected = useSelector(getSelectedPostSelector(props.id));

  const tags = useMemo(() => {
    return props.tags.map((tag) => `#${tag}`).join(' ');
  }, [props.tags]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        dispatch(selectedPostsActions.selectPost(ref.current));
      } else {
        dispatch(selectedPostsActions.unselectPost(+e.target.id));
      }
    },
    [dispatch]
  );

  return (
    <li id={`${props.id}`} className={style['post-preview']} onClick={onClick}>
      <h4 className={style['post-preview__title']}>
        <CustomCheckbox
          onChange={handleChange}
          id={props.id}
          checked={selected}
        />
        {props.title}
      </h4>

      <div className={style['post-preview__description']}>
        <p className={style['post-preview__body']}>
          {props.body} {tags.length > 0 && <span>{tags}</span>}
        </p>

        <div className={style['post-preview__info']}>
          <div className={style['post-preview__info_container']}>
            <img src={EyeIcon} alt="views" />
            <span>{props.views}</span>
          </div>
          <div className={style['post-preview__info_container']}>
            <img src={ThumbUpIcon} alt="likes" />
            <span>{props.reactions.likes}</span>
          </div>
          <div className={style['post-preview__info_container']}>
            <img src={ThumbDownIcon} alt="dislikes" />
            <span>{props.reactions.dislikes}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(PostPreview);
