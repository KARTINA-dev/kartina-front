import { TCollection } from '@/store/market/types';

import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/collections${rest}`;

export const getCollections = (galleryId?: string) =>
  makeRequest<TCollection[]>({ method: 'GET', url: getUrl(`/${galleryId || ''}`) });
