import { TItem } from '@/store/user/types';

import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/items${rest}`;

export const getItem = (address: string, itemID: number) =>
  makeRequest<TItem>({ method: 'GET', url: getUrl(`/${address}/${itemID}`) });
