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

interface pendingTransactionProps {
    amount: string;
    naira_value: string;
    status: string;
    details: transactionProps
}

interface pendingDetailsProps {
    status: string;
    message: string;
    transaction: pendingTransactionProps
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
    bank_icon: string;
};

export interface cryptoTradeDetailsProps {
  id: number;
  currency: string;
  network: string;
  created_at: string;
  updated_at: string;
  virtual_account_id: number;
  derivation_key: number;
  ref: string;
  address: string;
  user_id: number;
  qrcode: string | null;
};

interface sellDetailsProps {
    address: string;
    network: string;
    currency: string;
    qrcode: string | null;
    sellingId: number;
};

interface paymentData {
    status: string;
    message: string;
    data: {
        amount_transfered: number,
        coin_to_receive: number,
        message: string;
    },
    ref_number: string;
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
    cryptoTradeDetails: cryptoTradeDetailsProps | null;
    paymentDetails: paymentData | null;
    setCryptoTradeDetails: (newDetails: cryptoTradeDetailsProps) => void;
    setCoinNetwork: (newNetwork: string) => void;                 
    setItem: (newItem:  tradeProps) => void;
    setTransactionId: (newId: number) => void;
    setIsBill: (bill:boolean) => void,
    setAccountDetails: (newAccount: accountDetailsProps) => void;
    setSellDetails: (detail: sellDetailsProps) => void;
    setPaymentDetails: (data: paymentData) => void;
    clearItem: () =>void;
    clearTransactionId: () => void;
    clearAccountDetails: () => void;
    clearCryptoTradeDetails: () => void;
    clearSellDetail: () => void;
    clearPaymentDetails: () => void;
};

const useTradeStore = create<tradeState>((set) => ({         
    item: null,
    isBill: false,
    transactionId: null,
    accountDetails: null,
    sellDetails: null,
    coinNetwork: null,
    pendingDetails: null,
    cryptoTradeDetails: null,
    paymentDetails: null,
    setCryptoTradeDetails: (newDetails: cryptoTradeDetailsProps) => set({cryptoTradeDetails: newDetails}),
    setPendingDetails: (detail: pendingDetailsProps) => set({pendingDetails: detail}),
    setCoinNetwork: (newNetwork) => set({coinNetwork: newNetwork}), 
    setItem: (newItem) => set({item: newItem}),
    setAccountDetails: (newAccountDetail) => set({accountDetails: newAccountDetail}),
    setTransactionId: (newId) => set({transactionId: newId}),
    setIsBill: (bill) => set({isBill: bill}),
    setSellDetails: (detail: sellDetailsProps) => set({sellDetails: detail}),
    setPaymentDetails: (detail: paymentData) => set({paymentDetails: detail}),
    clearItem: () => set({item: null}),
    clearAccountDetails: () => set({accountDetails: null}),
    clearCryptoTradeDetails: () => set({cryptoTradeDetails: null}),
    clearTransactionId: () => set({transactionId: null}),
    clearSellDetail: () => set({sellDetails: null}),
    clearPaymentDetails: () => set({paymentDetails: null})
  }));

  export default useTradeStore;