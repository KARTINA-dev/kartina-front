import { TUserProfile } from '@/store/user/types';

import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/users${rest}`;

export const getUserProfile = (address: string) =>
  makeRequest<TUserProfile>({ method: 'GET', url: getUrl(`/${address}`) });
