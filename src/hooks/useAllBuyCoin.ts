import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface coinsProps {
  coin: string;
  coin_name: string;
  icon: string;
  status: string;
  id: number;
  method: string;
  stable_coins: string;
}

export const useAllBuyCoins = () => {
  return useQuery({
    queryKey: ['all-buy-coins'],
    queryFn: async () => {
      const res = await axios.get('https://api.olamax.io/api/all-coins/buy');
      if (res.status !== 200) throw new Error('Something went wrong, try again later');
      return res.data.coin as coinsProps[];
    },
  });
};