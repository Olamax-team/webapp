import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type PackageProps = {
  payment_item_name: string;
  product_number: string;
  amount: number;
};

const fetchPackages = async (id: number): Promise<PackageProps[]> => {
  const response = await axios.get(`https://api.olamax.io/api/subscription-packages/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data.prices as PackageProps[];
};

export const usePackages = (id: number) => {
  return useQuery({
    queryKey: ['fetch-packages', id],
    queryFn: () => fetchPackages(id),
    enabled: !!id,
  });
};
