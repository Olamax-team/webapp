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

export const useAllSellCoins = () => {
  return useQuery({
    queryKey: ['all-sell-coins'],
    queryFn: async () => {
      const res = await axios.get('https://api.olamax.io/api/all-coins/sell');
      if (res.status !== 200) throw new Error('Something went wrong, try again later');
      return res.data.coin as coinsProps[];
    },
  });
};