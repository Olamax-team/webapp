import { create } from 'zustand';

type activityProps = {
  active: number
  setActive: (active:number) => void;
};

export const activityIndex = create<activityProps>((set) => ({
  active: 0,
  setActive: (active) => set({ active }),
}));