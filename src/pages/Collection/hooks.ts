import { useEffect, useState } from 'react';

import { getCollection } from '@/api/collections';
import { TCollection } from '@/store/market/types';

export const useCollection = (collectionId?: string) => {
  const [collection, setCollection] = useState<TCollection>();

  useEffect(() => {
    getCollection(collectionId)
      .then((resp) => {
        setCollection(resp);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }, [collectionId]);

  return { collection };
};
