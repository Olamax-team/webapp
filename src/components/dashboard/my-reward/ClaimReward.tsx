import React from "react";
import { HiOutlineDuplicate } from "react-icons/hi"
import useUserDetails from "../../../stores/userStore";

const ClaimReward = () => {
  const {user:userDetail, fetchKycDetails, kycDetails } = useUserDetails();

    React.useEffect(() => {
      if (userDetail) {
        fetchKycDetails();
      }
    },[userDetail]);

  const link = 'https://olamax.io/referral_link/id?=36843611';
  const copyLinkToClipboard = (link:string) => {
    navigator.clipboard.writeText(link);
    alert("referral link copied!");
  };

  const maskLink = (text:string) => {
    const first_part  = text.slice(0, 14);
    const last_part = text.slice(text.length - 9)
    return `${first_part}....${last_part}`
  };

  const copyIdToClipboard = (id:string) => {
    navigator.clipboard.writeText(id);
    alert("referral id copied!");
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-10 lg:h-[334px]">
      <div className="flex flex-col gap-6">
        <div className="rounded-md bg-white px-4 py-5 h-[151px] lg:h-[190px] flex gap-5 flex-col">
          <p className="text-base lg:text-[20px] font-bold leading-normal w-[80%]">Earn Big with <span className="text-primary">Olamax&apos;s</span> Referral Program!</p>
          <div className="flex gap-2">
            <p>Total Reward:</p>
            <span>N2,000</span>
          </div>
          <div>
            <button type="button" className="text-primary">Claim Reward</button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:h-[120px] h-[93px] gap-6">
          <div className="w-full bg-white rounded-md h-full p-4">
            <p className="text-sm">Verified Referrals</p>
            <p className="text-[18px] lg:text-[23px] leading-normal font-bold">10</p>
          </div>
          <div className="w-full bg-white rounded-md h-full p-4">
            <p className="text-sm">Unverified Referrals</p>
            <p className="text-[18px] lg:text-[23px] leading-normal font-bold">2</p>
          </div>
        </div>
      </div>
      <div className="rounded-md bg-white px-4 h-full py-5 flex flex-col gap-4 justify-between">
        <h2 className="font-bold text-[20px] leading-normal mb-1">Invite Friends</h2>
        <div className="lg:h-24 h-20 bg-black rounded-md p-4 lg:p-5 flex text-white">
          <div className="w-[50%] flex flex-col justify-between">
            <p className="text-sm">You Receive</p>
            <p className="text-[18px] lg:text-[23px] leading-normal font-bold">10%</p>
          </div>
          <div className="w-[50%] flex flex-col justify-between">
            <p className="text-sm">Friend Receive</p>
            <p className="text-[18px] lg:text-[23px] leading-normal font-bold">10%</p>
          </div>
        </div>
        <div className="h-[45px] lg:h-[60px] bg-[#f5f5f5] rounded-md p-5 flex items-center justify-between">
          <p className="text-sm lg:text-base">Referral ID</p>
          <button className="flex items-center gap-1" onClick={() => copyIdToClipboard(kycDetails ? kycDetails.referral_code : '')}>
            <p className="text-sm lg:text-base">{kycDetails ? kycDetails.referral_code : ''}</p>
            <HiOutlineDuplicate size={18}/>
          </button>
        </div>
        <div className="h-[45px] lg:h-[60px] bg-[#f5f5f5] rounded-md p-4 lg:p-5 flex items-center justify-between">
          <p className="text-sm lg:text-base">Referral Link</p>
          <button className="flex items-center gap-1" onClick={() =>copyLinkToClipboard(link)}>
            <p className="text-sm lg:text-base">{maskLink(link)}</p>
            <HiOutlineDuplicate size={18}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClaimReward