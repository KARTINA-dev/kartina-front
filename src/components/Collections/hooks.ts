import { useEffect, useState } from 'react';

import { getCollections } from '@/api/collections';
import { TCollection } from '@/store/market/types';

export const useCollections = () => {
  const [collections, setCollections] = useState<TCollection[]>([]);

  useEffect(() => {
    getCollections()
      .then((resp) => {
        setCollections(resp);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);

  return { collections };
};
