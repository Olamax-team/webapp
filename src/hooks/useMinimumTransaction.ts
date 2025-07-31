import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type coinType = {
  id: number;
  coin_name: string;
  shorthand: string;
  buy: string;
  sell: string;
  escrow: string;
  status: string;
  stable_coins: string;
  created_at: string;
  updated_at: string;
};

type limitType = {
  buying_limit: string;
  selling_limit: string;
  card_limit: string;
  data_limit: string;
  card_limit_active: number;
  data_limit_active: number;
};

type minTransaction = {
  status: string;
  message: string;
  coin: coinType;
  limit: limitType;
  current_rate: number;
  sell_naira_rate: number;
  buy_naira_rate: number;
  transaction_charges: number;
  sell_naira_value: string;
  buy_naira_value: string;
  icon: string;
};

export const useMinimumTransaction = (id: number) => {
  return useQuery({
    queryKey: ['minimumTransaction', id],
    queryFn: async () => {
      const res = await axios.get(`https://api.olamax.io/api/min-transaction/${id}`);
      if (res.status !== 200) throw new Error('Something went wrong, try again later');
      return res.data as minTransaction;
    },
    enabled: !!id, // Only run when id is truthy
  });
};
