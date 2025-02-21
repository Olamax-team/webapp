import ClaimReward from "./ClaimReward"
import HowToInvite from "./HowToInvite"
import ReferralHistory from "./ReferralHistory"

const MyRewardContent = () => {
  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="w-full">
        <h2 className="font-DMSans font-bold lg:text-[26px] leading-normal text-[20px]">My Rewards</h2>
        <p className="font-Inter text-sm">Refer friends, get them verified, and earn crypto rewards when they trade.</p>
      </div>
      <ClaimReward />
      <HowToInvite/>
      <ReferralHistory/>
    </div>
  )
}

export default MyRewardContent;