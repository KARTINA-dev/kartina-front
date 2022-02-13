import { useTranslation as useTranslationHook } from 'react-i18next';
import { useCallback } from 'react';
import { TOptions } from 'i18next';

import { ru } from './resources';

export type TI18nDict = typeof ru.translation;
export type TGetI18nPath = (data: TI18nDict) => string;

const proxyHash: Record<string, any> = {};

const getProxyHandler = (path = ''): ProxyHandler<TI18nDict> => {
  return {
    get(target, key: keyof TI18nDict) {
      const pathToProperty = path ? `${path}.${key as string}` : key;

      if (typeof target[key] === 'object' && target[key] !== null) {
        if (!proxyHash[pathToProperty]) {
          proxyHash[pathToProperty] = new Proxy(target[key], getProxyHandler(pathToProperty) as never);
        }

        return proxyHash[pathToProperty] as typeof target[typeof key];
      } else {
        return pathToProperty;
      }
    },
    set() {
      return false;
    },
  };
};

const I18nProxy = new Proxy(ru.translation, getProxyHandler());

export const useTranslation = () => {
  const { t: tFunction, i18n } = useTranslationHook();
  const t = useCallback(
    (path: TGetI18nPath | string, options?: TOptions): string => {
      return tFunction(typeof path === 'function' ? path(I18nProxy) : path, options);
    },
    [tFunction],
  );

  return {
    t,
    i18n,
  };
};

export type TI18nFunction = ReturnType<typeof useTranslation>['t'];
