import { MEDIA_RELATIVE_URL } from '@/constants/media';

export const getMediaImage = (fileName: string) => {
  return `${MEDIA_RELATIVE_URL}/${fileName}`;
};
