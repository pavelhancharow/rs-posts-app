import { ComponentType } from 'react';
import { useSearchParams } from 'react-router';

type QueryParamTypes = 'details';

interface WrappedComponentProps {
  details: string;
}

export const withQueryParam = (
  WrappedComponent: ComponentType<WrappedComponentProps>,
  queryParam: QueryParamTypes
) => {
  return function ComponentWithQueryParam() {
    const [searchParams] = useSearchParams();
    const details = searchParams.get(queryParam);

    if (details) {
      return <WrappedComponent {...{ [queryParam]: details }} />;
    }

    return null;
  };
};
