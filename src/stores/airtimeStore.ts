import { create } from 'zustand'


interface airtimeProps {
    selectedOption: string;      
    selectedNetwork: string; 
    selectPayment: string; 
    airtimeAmount: string;  
    PaymentAmount: string; 

}
interface airtimeState {
    item:airtimeProps | null;                      
    setItem: (newItem:  airtimeProps) => void,
    clearItem: () =>void
};

const useAirtimeStore = create<airtimeState>((set) => ({         
    item: null, 
    setItem: (newItem) => set({item: newItem}),
    clearItem: () => set({item: null})
  }));

  export default useAirtimeStore;