import React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { create } from 'zustand';

type modalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const documentTitle = (title:string) => {

  React.useEffect(() => {
    document.title = `Olamax | ${title}`;
  }, [title]);
}

export const timelineCreator = (date:string) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dateDiff = Math.floor((today.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));

  let displayDate: string;
  if (dateDiff === 0) {
    displayDate = 'Today';
  } else if (dateDiff === 1) {
    displayDate = 'Yesterday';
  } else if (dateDiff <= 2) {
    displayDate = `${dateDiff} days ago`;
  } else {
    displayDate = new Date(date).toLocaleDateString();
  }

  return displayDate;
};

export const useWhatNextModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useUploadDocumentModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
