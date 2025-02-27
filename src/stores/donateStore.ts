import { create } from 'zustand'


interface donateProps {
    paymentMethod: string; 
    currency: string;
    amount: string;  
    name: string;
    contact: string;
}
interface donateState {
    item:donateProps | null;                      
    setItem: (newItem:  donateProps) => void,
    clearItem: () =>void
};

const useDonateStore = create<donateState>((set) => ({         
    item: null, 
    setItem: (newItem) => set({item: newItem}),
    clearItem: () => set({item: null})
  }));

  export default useDonateStore;