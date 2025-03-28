import { FetchResponse } from '../models';

const BASE_URL = 'https://dummyjson.com';

export async function fetchFromApi<T>(
  endpoint: string,
  signal?: AbortSignal
): Promise<FetchResponse<T>> {
  const url = URL.parse(endpoint, BASE_URL) as URL;

  const response = await fetch(url.href, { signal });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
