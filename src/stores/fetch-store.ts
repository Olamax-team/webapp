import { create } from 'zustand';
import axios from 'axios';

interface FetchStore {
  fetchBillServices: () => Promise<cryptoServiceProps[]>;
  fetchCryptoServices: () => Promise<cryptoServiceProps[]>;
  fetchNetworkAirtime: () => Promise<airtimeNetworkProps []>;
  fetchAllCoins: () => Promise<coinsProps[]>;
  fetchAllBuyCoins: () => Promise<coinsProps[]>;
  fetchAllSellCoins: () => Promise<coinsProps[]>;
  fetchStableCoins: () => Promise<coinsProps[]>;
  fetchAllCoinPrices: () => Promise<coinPriceProps[]>;
  fetchDataPurchaseNetworks: () => Promise<airtimeNetworkProps[]>
};

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

}));