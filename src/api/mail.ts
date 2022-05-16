import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/mail${rest}`;

export const subscribeEmail = (email: string) => {
  return makeRequest<{ email: string }>({ method: 'POST', url: getUrl(`/subscribe`), body: { email } });
};
