import Axios, { Method, ResponseType } from 'axios';

interface IMakeRequestConfig {
  method?: Method;
  url?: string;
  body?: unknown;
  params?: unknown;
  headers?: Record<string, string>;
  responseType?: ResponseType;
  signal?: AbortSignal;
}

const makeRequestCreator =
  (apiPrefix = '') =>
  <T = unknown>(config: IMakeRequestConfig) => {
    const { method = 'GET', url = '/', body, params, headers, responseType, signal } = config;

    Axios.defaults.baseURL = apiPrefix;
    Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    return Axios.request<T>({
      method,
      url,
      data: body,
      params,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      responseType,
      signal,
    }).then((res) => res.data);
  };

export const makeRequest = makeRequestCreator('/backend');
