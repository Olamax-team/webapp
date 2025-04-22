import { create } from 'zustand'


interface tradeProps {
    fiatType_id:  number;
    cryptoType_id: number;
    tradeType: string; 
    fiatType: string;
    cryptoType: string;
    fiatAmount: string;  
    cryptoAmount: string; 
};

interface accountDetailsProps {
    bank_account: string;
    bank:string;
    bank_account_name: string;
    amount: number;
    narration: string;
    expiry_date: string;
    ref_number: string;
};

interface tradeState {
    item:tradeProps | null;
    transactionId: number | null;
    accountDetails: accountDetailsProps | null;                   
    setItem: (newItem:  tradeProps) => void;
    setTransactionId: (newId: number) => void;
    setAccountDetails: (newAccount: accountDetailsProps) => void;
    clearItem: () =>void;
    clearTransactionId: () => void;
    clearAccountDetails: () => void;
};

const useTradeStore = create<tradeState>((set) => ({         
    item: null,
    transactionId: null,
    accountDetails: null,
    setItem: (newItem) => set({item: newItem}),
    setAccountDetails: (newAccountDetail) => set({accountDetails: newAccountDetail}),
    setTransactionId: (newId) => set({transactionId: newId}),
    clearItem: () => set({item: null}),
    clearAccountDetails: () => set({accountDetails: null}),
    clearTransactionId: () => set({transactionId: null}),
  }));

  export default useTradeStore;