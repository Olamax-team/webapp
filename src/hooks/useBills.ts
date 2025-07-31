import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type BillsProps = {
  service: string;
  icon: string;
  label: string;
};

const fetchBills = async (): Promise<BillsProps[]> => {
  const response = await axios.get('https://api.olamax.io/api/get-bills', {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data.services as BillsProps[];
};

export const useBills = () => {
  return useQuery({
    queryKey: ['fetch-bills'],
    queryFn: fetchBills,
  });
};
