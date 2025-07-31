import { create } from 'zustand';

type activityProps = {
  activeTab: string;
  setActiveTab : (tab:string) => void;
  active: number;
  showTransactionDetail: boolean;
  selectedBill: string;
  setShowTransactionDetail: (showTransactionDetail:boolean) =>void;
  setSelectedBill: (selectedBill:string) =>void;
  setActive: (active:number) => void;
};


export const activityIndex = create<activityProps>((set) => ({
  activeTab: 'sell',
  setActiveTab: (tab:string) => set({activeTab: tab}),
  active: 0,
  showTransactionDetail: false,
  selectedBill: '',
  setShowTransactionDetail: (showTransactionDetail:boolean) => set({showTransactionDetail}),
  setActive: (active:number) => set({ active }),
  setSelectedBill: (selectedBill:string) => set({selectedBill})
}));






