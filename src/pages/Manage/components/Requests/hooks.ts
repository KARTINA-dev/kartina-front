import { useDispatch, useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { galleryActions } from '@/store/gallery/store';

export const useRequests = (galleryId: string | null) => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.gallery.requests);

  useEffect(() => {
    if (galleryId) {
      void dispatch(galleryActions.sideEffects.getRequests(galleryId));
    }
  }, [dispatch, galleryId]);

  return { requests };
};
