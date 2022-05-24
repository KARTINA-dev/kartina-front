import { TCollection } from '@/store/market/types';

import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/collections${rest}`;

export const getCollections = () => makeRequest<TCollection[]>({ method: 'GET', url: getUrl() });

export const getCollection = (collectionId?: string) =>
  makeRequest<TCollection>({ method: 'POST', url: getUrl(), body: { _id: collectionId } });

export const getRelatedListings = (listingID: number) =>
  makeRequest<TCollection>({ method: 'POST', url: getUrl(), body: { listingID } }).then(
    (collection) => collection.listings,
  );
