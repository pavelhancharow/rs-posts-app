import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { localStorageService } from '../services';
import { PostsSearchParams } from '../models';

export function useSearchQuery() {
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const [query, setQuery] = useState<PostsSearchParams>(() => {
    return localStorageService.searchParams;
  });

  const updateSearchQuery = useCallback(
    (newParams: Partial<PostsSearchParams>) => {
      setQuery((prev) => {
        const updated = { ...prev, ...newParams };

        if (!updated.q) delete updated.q;

        return updated;
      });
    },
    []
  );

  useEffect(() => {
    const prevQuery = JSON.stringify(localStorageService.searchParams);

    if (prevQuery !== JSON.stringify(query)) {
      localStorageService.searchParams = query;
    }
  }, [query]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    if (query.q) {
      urlParams.set('search', query.q);
    } else {
      urlParams.delete('search');
    }

    urlParams.set('page', String(Math.floor(query.skip / query.limit) + 1));
    urlParams.set('perPage', String(query.limit));

    if (isFirstRender.current) {
      if (!urlParams.has('details') && localStorageService.detailsParams) {
        urlParams.set('details', localStorageService.detailsParams);
      }

      isFirstRender.current = false;
    }

    localStorageService.detailsParams = urlParams.get('details') || '';

    setSearchParams(urlParams);
  }, [query, location.search, setSearchParams]);

  return { query, updateSearchQuery };
}
