import { useContext } from 'react';
import { PostsListContext } from '../../context/PostsListContext.tsx';
import { ButtonTypes, LoadingStatuses } from '../../enums';
import CustomButton from '../CustomButton/CustomButton.tsx';

function SearchBarButton() {
  const context = useContext(PostsListContext);

  return (
    <CustomButton
      type={ButtonTypes.Submit}
      disabled={context.status === LoadingStatuses.Pending}
    >
      Search
    </CustomButton>
  );
}

export default SearchBarButton;
