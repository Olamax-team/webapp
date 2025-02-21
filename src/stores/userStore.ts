import { create } from 'zustand';

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
};


const useUserDetails = create<userDetailProps>((set) => ({
  user: null,
  token: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setUser: (user, token) => set({ user, token}),
  clearUser: () => set({ user: null, token: null }),
}));

export default useUserDetails;