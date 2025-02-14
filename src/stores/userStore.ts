import { create } from 'zustand';

export type userProps = {
  UID: string | null;
  account_status: string;
  email: string;
  last_login_location: string;
};

export type userDetailProps = {
  userDetail: userProps | null;
  token: string | null;
  isLoggedIn: boolean;
  setUser: (userDetail: userProps, token:string, isLoggedIn:boolean) => void;
  clearUser: () => void;
};


const useUserDetails = create<userDetailProps>((set) => ({
  userDetail: null,
  token: null,
  isLoggedIn: false,
  setUser: (userDetail, token, isLoggedIn) => set({ userDetail, token, isLoggedIn}),
  clearUser: () => set({ userDetail: null, token: null, isLoggedIn: false }),
}));

export default useUserDetails;