import { useCallback, useEffect, useState } from 'react';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';

import { useDispatch } from '@/store/hooks';
import { galleryActions } from '@/store/gallery/store';
import { TCreateRequest, TRequestImage } from '@/store/gallery/types';

const defaultRequestImage: TRequestImage = { name: '', description: '', artist: '', price: '10', fileName: '' };
const defaultRequest: TCreateRequest = { name: '', description: '', images: [], files: [], gallery: '' };

export const useCreateRequest = (galleryId: string | null) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [request, setRequest] = useState<TCreateRequest>(defaultRequest);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentImage, setCurrentImage] = useState<TRequestImage | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const getImageUrl = useCallback(
    (index: number) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      request.files[index] ? URL.createObjectURL(request.files[index]) : '',
    [request.files],
  );

  const onImageBeforeUpload = useCallback((file: UploadFile) => {
    setRequest((request) => ({ ...request, files: [...request.files, file] }));

    return false;
  }, []);

  const onImageChange = useCallback((key: string, value?: string | number | RcFile) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCurrentImage((image) => ({ ...image, [key]: value }));
  }, []);

  const onRequestChange = useCallback((key: string, value: number | string) => {
    setRequest((request) => ({ ...request, [key]: value }));
  }, []);

  const validateCollection = useCallback(() => {
    if (!request.files.length) {
      setError('Не были загружены картины');

      return false;
    }

    if (!request.name) {
      setError('Укажите название коллекции');

      return false;
    }

    setError('');

    return true;
  }, [request.files.length, request.name]);

  const next = useCallback(() => {
    if (!validateCollection()) {
      return;
    }

    const { name: fileName } = request.files[currentIndex] || {};

    if (fileName) {
      setRequest((request) => ({
        ...request,
        images: [...request.images, { ...(currentImage || defaultRequestImage), fileName }],
      }));
    }

    if (currentIndex >= request.files.length - 1) {
      setIsCompleted(true);

      return;
    }

    setCurrentIndex((index) => index + 1);
    setCurrentImage(defaultRequestImage);
  }, [currentImage, currentIndex, request.files, validateCollection]);

  const createRequest = useCallback(() => {
    if (!request.gallery) {
      setError('Не правильно указана галерея');

      return;
    }

    void dispatch(galleryActions.sideEffects.sendRequest(request));
  }, [dispatch, request]);

  useEffect(() => {
    if (galleryId) {
      setRequest((request) => ({ ...request, gallery: galleryId }));
    }
  }, [galleryId]);

  return {
    request,
    error,
    next,
    currentImage,
    currentIndex,
    isCompleted,
    getImageUrl,
    createRequest,
    onRequestChange,
    onImageChange,
    onImageBeforeUpload,
  };
};
