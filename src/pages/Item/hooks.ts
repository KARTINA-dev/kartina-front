import { useEffect, useState } from 'react';

import { TItem } from '@/store/user/types';
import api from '@/api';

export const useItemInfo = (address?: string, itemID?: number) => {
  const [item, setItem] = useState<TItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address || !itemID) {
      return;
    }

    setIsLoading(true);

    api.items
      .getItem(address, itemID)
      .then((item) => {
        setItem(item);
      })
      .finally(() => setIsLoading(false));
  }, [address, itemID]);

  return { item, isLoading };
};
