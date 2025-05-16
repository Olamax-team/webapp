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
  back : string;
  dateOfBirth: string;
  documents_id: number;
  email: string;
  fname: string;
  front: string;
  gender: string;
  hold: string;
  nationality: string;
  kyc_dateOfBirth: string;
  kyc_documents_created_at: string;
  kyc_documents_status: string;
  kyc_documents_updated_at: string;
  kyc_documents_video_status: string;
  kyc_fname: string;
  kyc_gender: string;
  kyc_lname: string;
  kyc_phone_number: string;
  kyc_picture: string;
  kyc_user_details_created_at: string;
  kyc_user_details_id: number;
  kyc_user_details_status: string;
  kyc_user_details_updated_at: string;
  lname: string;
  mname: string;
  phone_number: string;
  referral_code: string
  short_video: string;
  status: string;
  uid: string;
  user_id: number
  verification_method: string;
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
}