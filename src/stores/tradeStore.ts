import { create } from 'zustand'


interface tradeProps {
    tradeType: string; 
    fiatType: string;
    cryptoType: string;
    fiatAmount: string;  
    cryptoAmount: string; 

}
interface tradeState {
    item:tradeProps | null;                      
    setItem: (newItem:  tradeProps) => void,
    clearItem: () =>void
};

const useTradeStore = create<tradeState>((set) => ({         
    item: null, 
    setItem: (newItem) => set({item: newItem}),
    clearItem: () => set({item: null})
  }));

  export default useTradeStore;