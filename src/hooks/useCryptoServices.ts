import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface UseFetchCryptoServicesResponse {
  cs: string;
  act: string;
}

const fetchCryptoServices = async (): Promise<UseFetchCryptoServicesResponse[]> => {
  const response = await axios.get('https://api.olamax.io/api/crypto-service', {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data.crypto_service as UseFetchCryptoServicesResponse[];
};

export const useCryptoServices = () => {
  return useQuery({
    queryKey: ['fetch-crypto-services'],
    queryFn: fetchCryptoServices,
  });
};
