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
    isBill: boolean;
    transactionId: number | null;
    accountDetails: accountDetailsProps | null;                   
    setItem: (newItem:  tradeProps) => void;
    setTransactionId: (newId: number) => void;
    setIsBill: (bill:boolean) => void,
    setAccountDetails: (newAccount: accountDetailsProps) => void;
    clearItem: () =>void;
    clearTransactionId: () => void;
    clearAccountDetails: () => void;
};

const useTradeStore = create<tradeState>((set) => ({         
    item: null,
    isBill: false,
    transactionId: null,
    accountDetails: null,
    setItem: (newItem) => set({item: newItem}),
    setAccountDetails: (newAccountDetail) => set({accountDetails: newAccountDetail}),
    setTransactionId: (newId) => set({transactionId: newId}),
    setIsBill: (bill) => set({isBill: bill}),
    clearItem: () => set({item: null}),
    clearAccountDetails: () => set({accountDetails: null}),
    clearTransactionId: () => set({transactionId: null}),
  }));

  export default useTradeStore;