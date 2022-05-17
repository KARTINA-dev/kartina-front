import { useCallback, useEffect, useMemo, useState } from 'react';

import { ListingsSort, TListing, TListingsFilter } from '@/store/market/types';
import { getArtists, getListings } from '@/api/market';
import { useTranslation } from '@/i18n';

interface IUseListings {
  filter: TListingsFilter;
}

const LISTING_SORT = [ListingsSort.DATE_ASC, ListingsSort.PRICE_ASC, ListingsSort.PRICE_DESC];

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

export const useArtistsOptions = () => {
  const [artists, setArtists] = useState<{ name: string }[]>([]);

  useEffect(() => {
    getArtists()
      .then((resp) => {
        setArtists(resp);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);

  return useMemo(() => artists.map(({ name }) => ({ label: name, value: name })), [artists]);
};

export const useFilter = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<TListingsFilter>({
    price: 50000,
    name: '',
    artists: [],
    sort: ListingsSort.DATE_ASC,
  });

  const sortOptions = useMemo(
    () => LISTING_SORT.map((rule) => ({ label: t((d) => d.market.sort[rule]), value: rule })),
    [t],
  );

  const onFilterChange = useCallback((key: string, value: number | string | Array<string | number | boolean>) => {
    setFilter((filter) => ({ ...filter, [key]: value }));
  }, []);

  return { filter, sortOptions, onFilterChange };
};
