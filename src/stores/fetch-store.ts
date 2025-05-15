import { create } from 'zustand';
import axios from 'axios';


interface cryptoServiceProps {
  cs: string;
  act: string;
};

interface airtimeNetworkProps {
  network: string;
  product_number: number;
  icon: string;
};

interface coinPriceProps {
  id: number;
  coin_id: number;
  selling: string;
  buying: string;
  escrow: string;
};

interface coinsProps {
  coin: string;
  coin_name: string;
  icon: string;
  status: string;
  id: number;
  method: string;
  stable_coins: string;
};

type blockChain = {
  blockchain_name: string;
  coin_id: number;
  created_at: string;
  id: string;
  updated_at: string;
};

type coinType = {
  id: number,
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
}

type minTransaction = {
  status: string;
  message: string;
  coin: coinType;
  limit: limitType;
  current_rate: number;
  transaction_charges: number;
  sell_naira_value: string;
  buy_naira_value: string;
  icon: string;
}

type cableServicesProps = {
  cable: string;
  product_number: number;
  abrv: string;
  icon: string;
};


type liveRateCoin = {
  coin: string;
  symbol: string;
  price: string;
  icon: string;
  change: string;
  percentageChange: string;
  arrow: string;
  color: string;
}

type packageProps = {
  payment_item_name: string;
  product_number: string;
  amount: number
};


interface FetchStore {
  fetchBillServices: () => Promise<cryptoServiceProps[]>;
  fetchCryptoServices: () => Promise<cryptoServiceProps[]>;
  fetchNetworkAirtime: () => Promise<airtimeNetworkProps []>;
  fetchAllCoins: () => Promise<coinsProps[]>;
  fetchAllBuyCoins: () => Promise<coinsProps[]>;
  fetchAllSellCoins: () => Promise<coinsProps[]>;
  fetchStableCoins: () => Promise<coinsProps[]>;
  fetchAllCoinPrices: () => Promise<coinPriceProps[]>;
  fetchDataPurchaseNetworks: () => Promise<airtimeNetworkProps[]>;
  fetchCoinBlockChain: (id:number) => Promise<blockChain[]>;
  fetchMinimumTransaction: (id:number) => Promise<minTransaction>;
  fetchTvServices: () => Promise<cableServicesProps[]>;
  fetchLiveRates: () => Promise<liveRateCoin[]>;
  fetchPackages: (id:number) => Promise<packageProps[]>;
};


export const useFetchStore = create<FetchStore>(() => ({

  fetchBillServices: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/get-bills-services',
      headers: {'Content-Type':'application/json',},
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.bill_service as cryptoServiceProps[];
    return data;
  },

  fetchCryptoServices: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/crypto-service',
      headers: {'Content-Type':'application/json',},
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.crypto_service as cryptoServiceProps[];
    return data;
  },

  fetchNetworkAirtime: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/get-airtime-data-network/airtime',
      headers: {'Content-Type':'application/json',},
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    };
    const data = response.data.branches as airtimeNetworkProps[];
    return data;
  },

  fetchAllCoins: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/all-coins',
      headers: {'Content-Type':'application/json',},
    });
    
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    };

    const data = response.data.coin as coinsProps[];
    return data;
  },

  fetchStableCoins: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/stable-coins/buy',
      headers: {'Content-Type':'application/json',},
    });

    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    };

    const data = response.data.coin as coinsProps[];
    return data;
  },

  fetchAllBuyCoins: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/all-coins/buy',
      headers: {'Content-Type':'application/json',},
    });
    
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    };

    const data = response.data.coin as coinsProps[];
    return data;
  },

  fetchAllSellCoins: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/all-coins/sell',
      headers: {'Content-Type':'application/json',},
    });
    
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    };

    const data = response.data.coin as coinsProps[];
    return data;
  },

  fetchAllCoinPrices: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/coin-prices',
      headers: {'Content-Type':'application/json',},
    });

    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    };

    const data = response.data as coinPriceProps[];
    return data;
  },

  fetchDataPurchaseNetworks: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/get-airtime-data-network/data',
      headers: {'Content-Type':'application/json'}
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.branches as airtimeNetworkProps[];
    return data;
  },

  fetchCoinBlockChain: async (id:number) => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/coin-blockchains/${id}`,
      headers: {'Content-Type':'application/json'}
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.chain as blockChain[];
    return data;
  },

  fetchMinimumTransaction: async (id:number) => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/min-transaction/${id}`,
      headers: {'Content-Type':'application/json'}
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data as minTransaction;
    return data;
  },

  fetchTvServices: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/get-tv`,
      headers: {'Content-Type':'application/json'}
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.cable as cableServicesProps[];
    return data;
  },

  fetchLiveRates: async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/price-ticker`,
      headers: {'Content-Type':'application/json'}
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data as liveRateCoin[];
    return data;
  },

  fetchPackages: async (id:number) => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/subscription-packages/${id}`,
      headers: {'Content-Type':'application/json'}
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.prices as packageProps[];
    return data;
  },

}));