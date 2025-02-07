import { create } from 'zustand'


interface billsProps {
    // selectedOption: string;      
    selectedNetwork: string; 
    selectPayment: string; 
    inputAmount: string;  
    paymentAmount: string; 

}
interface billsState {
    item:billsProps | null;                      
    setItem: (newItem:  billsProps) => void,
    clearItem: () =>void
};

const useBillsStore = create<billsState>((set) => ({         
    item: null, 
    setItem: (newItem) => set({item: newItem}),
    clearItem: () => set({item: null})
  }));

  export default useBillsStore;