import { TUser } from '@/store/user/types';

import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/users${rest}`;

export const getUserProfile = (address: string) => makeRequest<TUser>({ method: 'POST', url: getUrl(`/${address}`) });
