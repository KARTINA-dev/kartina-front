import { useEffect, useState } from 'react';

import api from '@/api';
import { TListing } from '@/store/market/types';

export const useListingInfo = (address?: string, listingID?: number) => {
  const [listing, setlisting] = useState<TListing | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address || !listingID) {
      return;
    }

    setIsLoading(true);

    api.market
      .getListing(listingID, address)
      .then((listing) => {
        setlisting(listing);
      })
      .finally(() => setIsLoading(false));
  }, [address, listingID]);

  return { listing, isLoading };
};
