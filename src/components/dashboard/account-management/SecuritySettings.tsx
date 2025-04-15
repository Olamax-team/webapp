import React from "react";
import { HiInformationCircle, HiLockClosed, HiShieldCheck } from "react-icons/hi";
import { cn, useConfirmPasswordChangeModal, useEnableAuthModal, useStartDeleteModal } from "../../../lib/utils";
import { Switch } from "../../ui/switch";
import useUserDetails from "../../../stores/userStore";

const SecuritySettings = () => {

  const { onOpen } = useStartDeleteModal();
  const { user, fetchKycStatus } = useUserDetails();
  const openChangePassword = useConfirmPasswordChangeModal();
  const openEnableAuth = useEnableAuthModal();

  const [use2Fa, setUse2Fa] = React.useState(false);

  const toggle2FaSwitch = (value:boolean) => {
    setUse2Fa(value);
    openEnableAuth.onOpen();
  };

  React.useEffect(() => {
    if (!openEnableAuth.isOpen) {
      setUse2Fa(false)
    }
  },[openEnableAuth.isOpen])

  React.useEffect(() => {
    if (user) {
      fetchKycStatus();
    }
  },[user]);

  return (
    <div className="w-full h-auto p-4 lg:p-5 rounded-md bg-white flex flex-col gap-5">
      <div>
        <h2 className="text-base lg:text-[20px] leading-normal font-Inter font-bold">Security Settings</h2>
        <p className="text-sm lg:text-base">Enhance your protection and control your account’s security.</p>
      </div>
      <div className="w-full bg-[#f5f5f5] lg:h-[100px] h-[75px] rounded p-4 lg:p-5 flex items-center justify-between">
        <div className="h-[40px] lg:h-[50px] flex lg:gap-5 gap-4">
          <div className={cn("size-[40px] lg:size-[50px] rounded-full bg-white/50 flex items-center justify-center text-primary flex-none")}>
            <HiShieldCheck className="size-5 lg:size-6"/>
          </div>
          <div className="font-Inter">
            <h2 className="lg:text-lg md:text-base text-sm font-bold">2-Factor Authentication</h2>
            <p className="text-xs md:text-sm lg:text-base">Enhance your account security.</p>
          </div>
        </div>
        <Switch
          checked={use2Fa}
          onCheckedChange={(value) => toggle2FaSwitch(value)}
        />
      </div>
      <div className="w-full bg-[#f5f5f5] lg:h-[100px] h-[75px] rounded p-4 lg:p-5 flex items-center justify-between">
        <div className="h-[40px] lg:h-[50px] flex lg:gap-5 gap-4">
          <div className="size-[40px] lg:size-[50px] rounded-full bg-white/50 flex items-center justify-center text-primary flex-none">
            <HiLockClosed className="size-5 lg:size-6"/>
          </div>
          <div className="font-Inter">
            <h2 className="lg:text-lg md:text-base text-sm font-bold">Change your password</h2>
            <p className="text-xs md:text-sm lg:text-base">Protect your account instantly.</p>
          </div>
        </div>
        <button className="text-primary lg:text-base md:text-xm text-xs" onClick={() => openChangePassword.onOpen()}>Change Password</button>
      </div>
      <div className="w-full bg-[#f5f5f5] lg:h-[100px] h-[75px] rounded p-4 lg:p-5 flex items-center justify-between">
        <div className="h-[40px] lg:h-[50px] flex lg:gap-5 gap-4">
          <div className="size-[40px] lg:size-[50px] rounded-full bg-red-300/50 flex items-center justify-center text-red-600 flex-none">
            <HiInformationCircle className="size-5 lg:size-6"/>
          </div>
          <div className="font-Inter">
            <h2 className="lg:text-lg md:text-base text-sm font-bold text-red-600">Delete account</h2>
            <p className="text-xs md:text-sm lg:text-base text-red-500">Close your account permanently</p>
          </div>
        </div>
        <button className="text-red-500 lg:text-base md:text-xm text-xs" onClick={() => onOpen()}>Delete Account</button>
      </div>
    </div>
  )
};

export default SecuritySettings