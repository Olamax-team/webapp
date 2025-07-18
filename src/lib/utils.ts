import React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { create } from 'zustand';
import CryptoJS from "crypto-js";

type modalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export interface EncryptedResult {
  encrypted: string;
  iv: string;
};


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

export const formatNigerianPhoneNumber = (phoneNumber:string) => {
  if (phoneNumber && phoneNumber.startsWith('+234')) {
    return phoneNumber.substring(4);
  }
  return phoneNumber;
};

export const removeEmptyKeys = (obj: Record<string, any>): Record<string, any> => {
  if (!obj || typeof obj !== 'object') {
    return {};
  }

  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && Object.keys(value).length === 0)
      ) {
        newObj[key] = value;
      }
    }
  }
  return newObj;
}

export const useWhatNextPasswordModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useWhatNextUploadModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useVerificationProgressModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useUploadDocumentModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useConfirmDeleteModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useVerifyDeleteModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useAuthFactorModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useChangePasswordModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useConfirmPasswordChangeModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useVerifyPasswordChangeModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const usePasswordChangeCompleteModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useEnableAuthModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useActivateAuthModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useQRCodeModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useSecurityAuthModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export const useConfirmModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useActiveQRModals = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useOpenActiveOtpModals = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export const useActivePaymentModals = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export const useActiveCompleteTransactionModals = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useConfirmCompleteTransaction = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const usePaymentConfirmationModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useTransactionCompletedModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useTwoFactorModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useVerifyCodeModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useFiatPaymentDetailsModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useCryptoPaymentDetailsModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useSellConfirmCompleteTransaction = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useConfirmVerificationModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

//2famodal
export const useConfirmFactorAuthModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const generateImagePath = (image: string) => {
  return `%PUBLIC_URL%/images/${image}`;
};

export const useCryptoDonateModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useFiatDonateModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useDonateCompletedModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useDonateConfirmationModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useOTCModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useOpenNotification = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useOpenMobile = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useStartDeleteModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useIdentityVerifiedModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useKYCConfirmationModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useTransactionPendingModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const usePendingTransactionDetailsModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useConfirmBillsModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useFiatBillsPaymentModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useCryptoBillsPaymentModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useReviewsModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
})); 

const secretKey = import.meta.env.VITE_ENCRYPTION_KEY;

if (!secretKey) {
  throw new Error('ENCRYPTION_KEY is not defined in .env file');
}


export function encryptPayload(payload: Record<string, any>): EncryptedResult {
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return {
    encrypted: encrypted.toString(),
    iv: CryptoJS.enc.Base64.stringify(iv),
  };
}

export function decryptPayload<T = any>(ciphertext: string, ivBase64: string): T {
  const iv = CryptoJS.enc.Base64.parse(ivBase64);

  const decrypted = CryptoJS.AES.decrypt(
    ciphertext,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}




