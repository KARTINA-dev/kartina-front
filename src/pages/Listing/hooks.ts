import { useEffect, useState } from 'react';

import api from '@/api';
import { TListing } from '@/store/market/types';

export const useListingInfo = (address?: string, listingID?: number) => {
  const [listing, setListing] = useState<TListing | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address || !listingID) {
      return;
    }

    setIsLoading(true);

    api.market
      .getListing(listingID, address)
      .then((listing) => {
        setListing(listing);
      })
      .finally(() => setIsLoading(false));
  }, [address, listingID]);

  return { listing, isLoading };
};

export const useRelatedListings = (listingId: number) => {
  const [related, setRelated] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    console.log(99);

    api.collections
      .getRelatedListings(listingId)
      .then((listings) => {
        setRelated(listings);
      })
      .finally(() => setIsLoading(false));
  }, [listingId]);

  return { related, isLoading };
};
