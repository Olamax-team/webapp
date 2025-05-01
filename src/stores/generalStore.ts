import { create } from 'zustand';

type activityProps = {
  active: number;
  showTransactionDetail: boolean;
  selectedBill: string;
  setShowTransactionDetail: (showTransactionDetail:boolean) =>void;
  setSelectedBill: (selectedBill:string) =>void;
  setActive: (active:number) => void;
};


export const activityIndex = create<activityProps>((set) => ({
  active: 0,
  showTransactionDetail: false,
  selectedBill: '',
  setShowTransactionDetail: (showTransactionDetail:boolean) => set({showTransactionDetail}),
  setActive: (active:number) => set({ active }),
  setSelectedBill: (selectedBill:string) => set({selectedBill})
}));






