import { TCreateRequest, TGallery, TRequest } from '@/store/gallery/types';
import { getFormData } from '@/helpers/getFormData';

import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/galleries${rest}`;

export const getGallery = (address: string) => makeRequest<TGallery>({ method: 'GET', url: getUrl(`/${address}`) });

export const getRequests = (address: string) =>
  makeRequest<TRequest[]>({ method: 'GET', url: getUrl(`/${address}/requests`) });

export const sendRequest = (request: TCreateRequest) => {
  const body = getFormData(request);

  return makeRequest<TRequest>({ method: 'POST', url: getUrl(`/requests`), body });
};
