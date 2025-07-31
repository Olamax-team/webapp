import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type CableServicesProps = {
  cable: string;
  product_number: number;
  abrv: string;
  icon: string;
};

const fetchTvServices = async (): Promise<CableServicesProps[]> => {
  const response = await axios.get('https://api.olamax.io/api/get-tv', {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data.cable as CableServicesProps[];
};

export const useTVServices = () => {
  return useQuery({
    queryKey: ['fetch-tv-services'],
    queryFn: fetchTvServices,
  });
};
