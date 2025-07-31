import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface UseFetchAllCoinPricesResponse {
  id: number;
  coin_id: number;
  selling: string;
  buying: string;
  escrow: string;
}

const fetchAllCoinPrices = async (): Promise<UseFetchAllCoinPricesResponse[]> => {
  const response = await axios.get('https://api.olamax.io/api/coin-prices', {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data as UseFetchAllCoinPricesResponse[];
};

export const useAllCoinPrices = (enabled?:boolean) => {
  return useQuery({
    queryKey: ['fetch-all-coin-prices'],
    queryFn: fetchAllCoinPrices,
    enabled: enabled
  });
};
