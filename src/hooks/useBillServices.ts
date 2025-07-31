import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface UseFetchBillServicesResponse {
  cs: string;
  act: string;
}

const fetchBillServices = async (): Promise<UseFetchBillServicesResponse[]> => {
  const response = await axios.get('https://api.olamax.io/api/get-bills-services', {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data.bill_service as UseFetchBillServicesResponse[];
};

export const useBillServices = () => {
  return useQuery({
    queryKey: ['fetch-bill-services'],
    queryFn: fetchBillServices,
  });
};
