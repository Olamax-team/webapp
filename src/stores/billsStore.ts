import { create } from 'zustand'


interface billsProps {    
    selectedNetwork: string; 
    selectPayment: string; 
    inputAmount: string;  
    paymentAmount: string; 
    fiatPayment:string;
    current_rate?: number;
    transaction_type?: string;
    naira_amount?: number;
    coin_token_id?: number;
    blockchain_id?: number;
    coin_amount?: number;
    bills?: string;
    network?: string;
    package_product_number?: number | string;
    electricity_type?: string;
    phone_number?: string;
    cable_number?: string;
    meter_number?: string;
};

interface billsState {
    item:billsProps | null;                   
    setItem: (newItem:  billsProps) => void,
    clearItem: () =>void
};

const useBillsStore = create<billsState>((set) => ({         
    item: null,
    transactionId: null, 
    accountDetails: null,
    setItem: (newItem) => set({item: newItem}),
    clearItem: () => set({item: null}),
  }));

  export default useBillsStore;