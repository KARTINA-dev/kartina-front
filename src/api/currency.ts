import Axios from 'axios';

type TCurrencyInfo = {
  time: string;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
};

export const getRate = (crypto: string, local: string) => {
  return Axios.request<TCurrencyInfo>({
    method: 'GET',
    url: `https://rest.coinapi.io/v1/exchangerate/${crypto}/${local}`,
    headers: {
      'X-CoinAPI-Key': '38AC9195-089F-4B1F-AC15-48C0F57A2BC4',
    },
  }).then((resp) => resp.data.rate);
};
