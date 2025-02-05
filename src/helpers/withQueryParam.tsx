import { ComponentType } from 'react';
import { useSearchParams } from 'react-router';

type QueryParamTypes = 'details';

export const withQueryParam = <P extends object>(
  WrappedComponent: ComponentType<P>,
  queryParam: QueryParamTypes
) => {
  return function ComponentWithQueryParam(props: P) {
    const [searchParams] = useSearchParams();
    const details = searchParams.get(queryParam);

    if (details) {
      return <WrappedComponent {...props} {...{ [queryParam]: details }} />;
    }

    return null;
  };
};
