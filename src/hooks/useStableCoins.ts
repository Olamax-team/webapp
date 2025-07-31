import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface UseFetchStableCoinsResponse {
  coin: string;
  coin_name: string;
  icon: string;
  status: string;
  id: number;
  method: string;
  stable_coins: string;
}

const fetchStableCoins = async (): Promise<UseFetchStableCoinsResponse[]> => {
  const response = await axios.get('https://api.olamax.io/api/stable-coins/buy', {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data.coin as UseFetchStableCoinsResponse[];
};

export const useStableCoins = () => {
  return useQuery({
    queryKey: ['fetch-stable-coins'],
    queryFn: fetchStableCoins,
  });
};
