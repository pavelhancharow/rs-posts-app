import { QueryStatus } from '@reduxjs/toolkit/query';
import { useContext } from 'react';
import { useGetAllPostsQuery } from '../../api';
import { SearchQueryContext } from '../../context';
import { ButtonTypes } from '../../enums';
import CustomButton from '../CustomButton/CustomButton.tsx';

function SearchBarButton() {
  const searchQuery = useContext(SearchQueryContext);
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
