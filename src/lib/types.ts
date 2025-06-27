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
  email: string;
  phone_number: string;
  status: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  profile_image: string;
  available_bonus: string;
  total_bonus: string;
  verification_method: string,
  is_blocked: number,
  is_suspended: number,
  is_deactivated: number,
  referral_code: string;
  referral_balance: string;
  newbie_bonus: string;
  newbie_seen: string;
  total_referred_users: number,
  unverified_referred_users: number,
  date_of_birth: string;
  gender: string;
  created_at: string;
  updated_at: string;
  referred_by: number
  last_activity: string;
  nationality: string;
  profile_picture: string;
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
