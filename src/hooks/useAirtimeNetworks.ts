import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface AirtimeNetworkProps {
  network: string;
  product_number: number;
  icon: string;
}

const fetchNetworkAirtime = async (): Promise<AirtimeNetworkProps[]> => {
  const response = await axios.get('https://api.olamax.io/api/get-airtime-data-network/airtime', {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data.branches as AirtimeNetworkProps[];
};

export const useAirtimeNetworks = () => {
  return useQuery({
    queryKey: ['fetch-network-airtime'],
    queryFn: fetchNetworkAirtime,
  });
};
