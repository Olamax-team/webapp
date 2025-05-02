import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios';
import { kycDetailsProps, kycDetailsStatusProps } from '../lib/types';

export type userProps = {
  UID: string | null;
  account_status: string;
  email: string;
  last_login_location: string;
};

export type userDetailProps = {
  user: userProps | null;
  token: string | null;
  setUser: (user: userProps, token:string ) => void;
  clearUser: () => void;
  loading: boolean;
  setLoading: (loading:boolean) => void;
  fetchKycDetails: () =>  void;
  fetchUserDetails: () =>  void;
  fetchKycStatus: () =>  void;
  clearKycDetails: () => void;
  clearUserDetails: () => void;
  clearKycStatus: () => void;
  kycDetails: kycDetailsProps | null;
  kycStatus: kycDetailsStatusProps | null;
};

export const useUserDetails = create<userDetailProps>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      kycDetails: null,
      kycStatus: null,
      setLoading: (loading) => set({ loading }),
      setUser: (user, token) => set({ user, token}),
      fetchKycDetails: async () => {
        const { token } = get();
        return axios.request({
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://api.olamax.io/api/get-kyc-details',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then((response) => {
          if (response.status === 200) {
            set({ kycDetails: response.data[0], loading: false });
          };
        }).catch((error) => {
          if (axios.isAxiosError(error)) {
            console.error("Error fetching data message:", error.response?.data.message || error.message);        
          } else {
            console.error("Unexpected error:", error);
          }; 
        });
      },
      fetchUserDetails: async () => {
        const { token } = get();
        return axios.request({
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://api.olamax.io/api/get-user-details',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then((response) => {
          if (response.status === 200) {
            set({ kycDetails: response.data[0], loading: false });
          };
        }).catch((error) => {
          if (axios.isAxiosError(error)) {
            console.error("Error fetching data message:", error.response?.data.message || error.message);        
          } else {
            console.error("Unexpected error:", error);
          }; 
        });
      },
      fetchKycStatus: async () => {
        const { token } = get();
        return axios.request({
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://api.olamax.io/api/get-kyc-details/kyc-status',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then((response) => {
          if (response.status === 200) {
            set({ kycStatus: response.data[0], loading: false });
          };
        }).catch((error) => {
          if (axios.isAxiosError(error)) {
            console.error("Error fetching data message:", error.response?.data.message || error.message);        
          } else {
            console.error("Unexpected error:", error);
          }; 
        });
      },
      clearUser: () => set({ user: null, token: null }),
      clearKycDetails: () => set({ kycDetails: null }),
      clearUserDetails: () => set({ kycDetails: null }),
      clearKycStatus: () => set({ kycStatus: null }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);


export default useUserDetails;