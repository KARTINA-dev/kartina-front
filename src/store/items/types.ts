export type TArtItem = {
  name: string;
  description: string;
  artist: string;
  image: File;
};

export enum Rarity {
  COMMON = '0',
  RARE = '1',
  ULTRA_RARE = '2',
  UNIQUE = '3',
}
