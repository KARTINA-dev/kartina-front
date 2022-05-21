import { useEffect, useState } from 'react';

import { TRequest } from '@/store/gallery/types';
import { getRequest } from '@/api/requests';

export const useDrop = (id?: string) => {
  const [drop, setDrop] = useState<TRequest | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getRequest(id)
      .then((resp) => setDrop(resp))
      .catch((err) => console.log(JSON.stringify(err)));
  }, [id]);

  return { drop };
};
