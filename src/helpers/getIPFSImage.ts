interface IGetIPFSImage {
  imageCID: string;
  size?: string;
  is2X?: boolean;
}

export const getIPFSImage = (config: IGetIPFSImage) => {
  const { imageCID, size = 'sm', is2X } = config;

  return `https://${imageCID}.ipfs.dweb.link/${size}${is2X ? '@2x' : ''}.png`;
};
