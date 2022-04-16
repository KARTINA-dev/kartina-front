interface IGetIPFSImage {
  imageCID: string;
  imagePath: string;
  size?: string;
  is2X?: boolean;
}

export const getIPFSImage = (config: IGetIPFSImage) => {
  const { imageCID, size, is2X, imagePath } = config;

  return `https://${imageCID}.ipfs.dweb.link/${size ? size : ''}${is2X ? '@2x' : ''}${imagePath}`;
};
