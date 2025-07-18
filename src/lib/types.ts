export type kycDetailsProps = {
  user_id: number;
  uid: string;
  email: string;
  referral_code: string;
  verification_method: any;
  fname: string;
  mname: any;
  lname: string;
  status: string;
  phone_number: string;
  gender: string;
  dateOfBirth: string;
  created_at: string;
  updated_at: string;
  blocked:number;
  referred_by: any;
  last_activity: string;
  nationality: string;
  prolife_image: string;
};

export type kycDetailsStatusProps = {
  user_id: number;
  uid: string;
  email: string;
  referral_code: string;
  verification_method: string | null;
  fname: string | null;
  mname: string | null;
  prolife_image: string | null; // Note: Is this meant to be "profile_image"?
  lname: string | null;
  status: "Unverified" | "Verified" | string; // Adjust enum if needed
  phone_number: string | null;
  gender: string | null;
  dateOfBirth: string | null; // Could be Date if parsed
  nationality: string | null;
  documents_id: number | null;
  front: string | null;
  back: string | null;
  hold: string | null;
  short_video: string | null;
  kyc_documents_created_at: string | null;
  kyc_documents_updated_at: string | null;
  kyc_documents_video_status: string | null;
  kyc_documents_status: string | null;
  kyc_user_details_id: number | null;
  kyc_user_details_status: string | null;
  kyc_fname: string | null;
  kyc_lname: string | null;
  kyc_gender: string | null;
  kyc_dateOfBirth: string | null;
  kyc_phone_number: string | null;
  kyc_picture: string | null;
  kyc_user_details_created_at: string | null;
  kyc_user_details_updated_at: string | null;
};


export type userDataProps = {
  id: number;
  uid: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  date_of_birth: string; // ISO date string: "YYYY-MM-DD"
  gender: 'male' | 'female' | string;
  nationality: string;
  profile_image: string;
  access_right: string; // e.g., "Full Access"
  role: string; // e.g., "superAdmin"
  status: string; // e.g., "verified"
  is_blocked: number; // 0 or 1
  is_deactivated: number; // 0 or 1
  is_suspended: number; // 0 or 1
  is_auth_code: 'active' | 'inactive' | string;
  referral_code: string;
  referred_by: string | null;
  referral_balance: string | null;
  total_bonus: string;
  available_bonus: string;
  newbie_bonus: 'Claimed' | 'Unclaimed' | string;
  newbie_seen: 'yes' | 'no' | string;
  total_referred_users: number;
  unverified_referred_users: number;
  last_activity: string; // "YYYY-MM-DD HH:mm:ss"
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
  verification_method: string | null;
};

// interface TransactionDetails {
//   id: number;
//   sell_transaction_id: number;
//   account_name: string;
//   account_number: string;
//   bank_name: string;
//   phone_number: string;
//   created_at: string; // ISO date string
//   updated_at: string; // ISO date string
// }

// interface Transaction {
//   amount: string;
//   naira_value: string;
//   status: string;
//   details: TransactionDetails;
// }

// type TransactionStatus = 'pending' | 'complete' | 'verified';

// export interface TransactionResponse {
//   status: TransactionStatus;
//   message: string;
//   transaction: Transaction;
// }

interface Favorite {
  coin: string;
  coin_name: string;
  id: number;
  icon: string;
  symbol: string;
  price: string;
  change: string;
  percentageChange: string;
  arrow: string;
  color: string;
  stable_coins: 'yes' | 'no';
  sell: 'on' | 'off';
  buy: 'on' | 'off';
  escrow: 'on' | 'off';
}

export interface FavoritesResponse {
  status: 'success' | 'error'; // assuming status can be 'success' or 'error'
  favorites: Favorite[];
}
