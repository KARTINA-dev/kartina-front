import { useEffect, useState } from 'react';

import { getHottestRequests } from '@/api/requests';
import { TRequest } from '@/store/gallery/types';

export const useHottest = () => {
  const [hottest, setHottest] = useState<TRequest[]>();

  useEffect(() => {
    getHottestRequests()
      .then((resp) => setHottest(resp))
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);

  return { hottest };
};
