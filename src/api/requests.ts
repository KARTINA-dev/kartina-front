import { makeRequest } from '@/api/makeRequest';
import { TRequest } from '@/store/gallery/types';
import { EmailTopic, TEmail } from '@/pages/Main/components/types';

const getUrl = (rest = '') => `/requests${rest}`;

export const getHottestRequests = () => makeRequest<TRequest[]>({ method: 'GET', url: getUrl('/hottest') });

export const getRequest = (id?: string) => makeRequest<TRequest>({ method: 'GET', url: getUrl(`/${id}`) });

export const subscribeHottestRequest = (email: string, request: string) => {
  return makeRequest<TEmail>({
    method: 'POST',
    url: getUrl(`/${request}/subscribe`),
    body: { email, request, topic: EmailTopic.Hottest },
  });
};
