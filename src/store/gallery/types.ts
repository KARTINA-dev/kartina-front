import { UploadFile } from 'antd/lib/upload/interface';

export const TYPE_PREFIX = 'gallery';

export type TGallery = {
  _id: string | null;
  name: string | null;
  address: string | null;
  country: string | null;
};

export type TGalleryState = TGallery & {
  requests: TRequest[];
  isLoading: boolean;
};

export type TRequestImage = {
  name: string;
  artist: string;
  description: string;
  price: string;
  fileName: string;
};

export enum RequestStatus {
  Listed = 'listed',
  Waiting = 'waiting',
  Declined = 'declined',
}

export type TRequest = {
  _id: string;
  name: string;
  description?: string;
  images: TRequestImage[];
  gallery: string;
  status: RequestStatus;
};

export type TCreateRequest = {
  name: string;
  description?: string;
  images: TRequestImage[];
  files: UploadFile[];
  gallery: string;
};
