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

// {
//   "status": "success",
//   "message": "coin found",
//   "coin": {
//       "id": 1,
//       "blockchain_name": "ton",
//       "created_at": "2025-02-05T18:08:32.000000Z",
//       "updated_at": "2025-02-05T18:08:32.000000Z",
//       "coin_id": 1
//   },
//   "limit": {
//       "buying_limit": "4800.00",
//       "selling_limit": "5000.00",
//       "card_limit": "1000.00",
//       "data_limit": "2000.00",
//       "card_limit_active": 1,
//       "data_limit_active": 1
//   },
//   "current_rate": 2.97,
//   "transaction_charges": 0.005,
//   "sell_naira_value": "1000.00",
//   "buy_naira_value": "1000.00",
//   "icon": ""
// }