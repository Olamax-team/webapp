import { HiOutlineGift } from "react-icons/hi2"
import AddTeamIcon from "../../ui/add-team-icon"
import ShareLinkIcon from "../../ui/share-link-icon"

const HowToInvite = () => {
  return (
    <div className="flex flex-col gap-12">
      <p className="text-[20px] leading-normal font-bold text-center lg:text-left">How To Invite</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-12 px-8 lg:px-0">
        <div className="bg-white w-full rounded-md p-5 py-8 flex flex-col gap-5">
          <div className="size-[50px] rounded-full items-center justify-center flex bg-secondary text-white -mt-[64px]">
            <ShareLinkIcon className="size-7"/>
          </div>
          <p className="text-secondary font-bold text-lg">Share Your Link</p>
          <p className="text-sm">Copy your unique referral link from your dashboard and share it with friends, family, and colleagues</p>
        </div>
        <div className="bg-white w-full rounded-md p-5 py-8 flex flex-col gap-5">
          <div className="size-[50px] rounded-full items-center justify-center flex bg-secondary text-white -mt-[64px]">
            <AddTeamIcon className="size-6"/>
          </div>
          <p className="text-secondary font-bold text-lg">Invite & Earn</p>
          <p className="text-sm">When they sign up using your link and complete their first transaction, you earn a bonus.</p>
        </div>
        <div className="bg-white w-full rounded-md p-5 py-8 flex flex-col gap-5">
          <div className="size-[50px] rounded-full items-center justify-center flex bg-secondary text-white -mt-[64px]">
            <HiOutlineGift className="size-6"/>
          </div>
          <p className="text-secondary font-bold text-lg">Track Your Rewards</p>
          <p className="text-sm">Keep an eye on your referral earnings directly from your dashboard. The more you refer, the more you earn!</p>
        </div>
      </div>
    </div>
  )
}

export default HowToInvite