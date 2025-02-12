import { QueryStatus } from '@reduxjs/toolkit/query';
import { useContext } from 'react';
import { useGetAllPostsQuery } from '../../api';
import { PostsListSearchQueryContext } from '../../context/PostsListContext.tsx';
import { ButtonTypes } from '../../enums';
import CustomButton from '../CustomButton/CustomButton.tsx';

function SearchBarButton() {
  const searchQuery = useContext(PostsListSearchQueryContext);
  const { status } = useGetAllPostsQuery(searchQuery);

  return (
    <CustomButton
      type={ButtonTypes.Submit}
      disabled={status === QueryStatus.pending}
    >
      Search
    </CustomButton>
  );
}

export default SearchBarButton;
