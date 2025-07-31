import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type BlockChain = {
  blockchain_name: string;
  coin_id: number;
  created_at: string;
  id: string;
  updated_at: string;
};

const fetchCoinBlockChain = async (id: number): Promise<BlockChain[]> => {
  const response = await axios.get(`https://api.olamax.io/api/coin-blockchains/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong, try again later');
  }

  return response.data.chain as BlockChain[];
};

export const useCoinBlockChains = (id: number) => {
  return useQuery({
    queryKey: ['fetch-coin-blockchain', id],
    queryFn: () => fetchCoinBlockChain(id),
    enabled: !!id, // Avoid running if `id` is falsy (e.g. 0 or undefined)
  });
};
