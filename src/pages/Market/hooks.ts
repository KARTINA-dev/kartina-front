import { useCallback, useEffect, useState } from 'react';

import { TListing, TListingsFilter } from '@/store/market/types';
import { getListings } from '@/api/market';

interface IUseListings {
  filter: TListingsFilter;
}

export const useListings = (props: IUseListings) => {
  const { filter } = props;
  const [listings, setListings] = useState<TListing[]>([]);

  useEffect(() => {
    getListings({ filter })
      .then((resp) => {
        setListings(resp);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }, [filter]);

  return { listings };
};

export const useFilter = () => {
  const [filter, setFilter] = useState<TListingsFilter>({ price: 50000, name: '', artists: [] });

  const onFilterChange = useCallback((key: string, value: number | string | Array<string | number | boolean>) => {
    setFilter((filter) => ({ ...filter, [key]: value }));
  }, []);

  return { filter, onFilterChange };
};
