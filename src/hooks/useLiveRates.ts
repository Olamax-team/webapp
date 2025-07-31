import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type liveRateCoin = {
  id: number;
  coin: string;
  symbol: string;
  price: string;
  icon: string;
  change: string;
  percentageChange: string;
  arrow: string;
  color: string;
}

const fetchLiveRates = async (): Promise<liveRateCoin[]> => {
  const response = await axios.get(`https://api.olamax.io/api/price-ticker`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data;
};

export const useLiveRates = () => {
  return useQuery({
    queryKey: ['live-rates'],
    queryFn: fetchLiveRates,
    staleTime: 60 * 1000, // 1 minute (adjust as needed)
    retry: 1, // Retry once on failure
  });
};
