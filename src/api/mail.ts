import { TEmail, EmailTopic } from '@/pages/Main/components/types';

import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/mail${rest}`;

export const subscribeEmail = (email: string) => {
  return makeRequest<TEmail>({ method: 'POST', url: getUrl(`/subscribe`), body: { email, topic: EmailTopic.All } });
};
