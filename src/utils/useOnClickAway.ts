import { useEffect, RefObject } from 'react';

type TEvent = MouseEvent | TouchEvent;

export const useOnClickAway = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: TEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: TEvent) => {
      const el = ref?.current;

      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
