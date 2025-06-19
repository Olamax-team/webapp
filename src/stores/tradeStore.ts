import { create } from 'zustand'

interface transactionProps {
    id: number;
    sell_transaction_id: number;
    account_name: string;
    account_number: string;
    bank_name:  string;
    phone_number:  string;
    created_at:  string;
    updated_at:  string;
};

interface pendingDetailsProps {
    status: string;
    message: string;
    transaction: {
        amount: string;
        naira_value: string;
        status: string;
        details: transactionProps
    }
};


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

interface sellDetailsProps {
    address: string;
    network: string;
    currency: string;
}

interface tradeState {
    item:tradeProps | null;
    isBill: boolean;
    pendingDetails: pendingDetailsProps | null;
    setPendingDetails : (detail:pendingDetailsProps) => void;
    transactionId: number | null;
    accountDetails: accountDetailsProps | null; 
    sellDetails:  sellDetailsProps | null;
    coinNetwork: string | null;
    setCoinNetwork: (newNetwork: string) => void;                 
    setItem: (newItem:  tradeProps) => void;
    setTransactionId: (newId: number) => void;
    setIsBill: (bill:boolean) => void,
    setAccountDetails: (newAccount: accountDetailsProps) => void;
    setSellDetails: (detail: sellDetailsProps) => void;
    clearItem: () =>void;
    clearTransactionId: () => void;
    clearAccountDetails: () => void;
    clearSellDetail: () => void;
};

const useTradeStore = create<tradeState>((set) => ({         
    item: null,
    isBill: false,
    transactionId: null,
    accountDetails: null,
    sellDetails: null,
    coinNetwork: null,
    pendingDetails: null,
    setPendingDetails: (detail: pendingDetailsProps) => set({pendingDetails: detail}),
    setCoinNetwork: (newNetwork) => set({coinNetwork: newNetwork}), 
    setItem: (newItem) => set({item: newItem}),
    setAccountDetails: (newAccountDetail) => set({accountDetails: newAccountDetail}),
    setTransactionId: (newId) => set({transactionId: newId}),
    setIsBill: (bill) => set({isBill: bill}),
    setSellDetails: (detail: sellDetailsProps) => set({sellDetails: detail}),
    clearItem: () => set({item: null}),
    clearAccountDetails: () => set({accountDetails: null}),
    clearTransactionId: () => set({transactionId: null}),
    clearSellDetail: () => set({sellDetails: null})
  }));

  export default useTradeStore;