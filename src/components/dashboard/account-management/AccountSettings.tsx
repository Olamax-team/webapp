import React from "react";
import { HiBell, HiCheckCircle, HiMail, HiPhone } from "react-icons/hi"
import { Switch } from "../../ui/switch";

const AccountSettings = () => {

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    const maskedLocalPart = localPart.length > 3 ? `${localPart.slice(0, 3)}***` : `${localPart.slice(0, 1)}***`;

    return `${maskedLocalPart}@${domain}`;
  };

  const maskPhoneNumber = (phoneNumber:string) => {
    const countryCode = '+234';
    const number = phoneNumber.slice(1, 11);
    const first_part = number.slice(0, 2);
    const last_part = number.slice(7, 11);
    return `${countryCode}${first_part}....${last_part}`
  };

  const [getNotification, setGetNotification] = React.useState(false)

  return (
    <div className="w-full h-auto p-4 lg:p-5 rounded-md bg-white flex flex-col gap-5">
      <div>
        <h2 className="text-base lg:text-[20px] leading-normal font-Inter font-bold">Account Settings</h2>
        <p className="text-sm lg:text-base">Manage your preferences and personalize your experience.</p>
      </div>
      <div className="w-full bg-[#f5f5f5] lg:h-[100px] h-[75px] rounded p-4 lg:p-5 flex items-center justify-between">
        <div className="h-[40px] lg:h-[50px] flex lg:gap-5 gap-4">
          <div className="size-[40px] lg:size-[50px] rounded-full bg-white/50 flex items-center justify-center text-primary flex-none">
            <HiMail className="size-5 lg:size-6"/>
          </div>
          <div className="font-Inter">
            <h2 className="lg:text-lg md:text-base text-sm font-bold">Email</h2>
            <p className="text-xs md:text-sm lg:text-base">Used to verify transactions.</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="size-6 md:size-7 lg:size-8 flex items-center justify-cente text-[#1FAF38]">
            <HiCheckCircle className="lg:size-6 size-5"/>
          </div>
          <p className="hidden md:block">{maskEmail('tosinAdebayor7@gmail.com')}</p>
        </div>
      </div>
      <div className="w-full bg-[#f5f5f5] lg:h-[100px] h-[75px] rounded p-4 lg:p-5 flex items-center justify-between">
        <div className="h-[40px] lg:h-[50px] flex lg:gap-5 gap-4">
          <div className="size-[40px] lg:size-[50px] rounded-full bg-white/50 flex items-center justify-center text-primary flex-none">
            <HiPhone className="size-5 lg:size-6"/>
          </div>
          <div className="font-Inter">
            <h2 className="lg:text-lg md:text-base text-sm font-bold">Phone Number</h2>
            <p className="text-xs md:text-sm lg:text-base">Secure your account with ease.</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="size-6 md:size-7 lg:size-8 flex items-center justify-cente text-[#1FAF38]">
            <HiCheckCircle className="lg:size-6 size-5"/>
          </div>
          <p className="hidden md:block">{maskPhoneNumber('09136565987')}</p>
        </div>
      </div>
      <div className="w-full bg-[#f5f5f5] lg:h-[100px] h-[75px] rounded p-4 lg:p-5 flex items-center justify-between">
        <div className="h-[40px] lg:h-[50px] flex lg:gap-5 gap-4">
          <div className="size-[40px] lg:size-[50px] rounded-full bg-white/50 flex items-center justify-center text-primary flex-none">
            <HiBell className="size-5 lg:size-6"/>
          </div>
          <div className="font-Inter">
            <h2 className="lg:text-lg md:text-base text-sm font-bold">Notifications</h2>
            <p className="text-xs md:text-sm lg:text-base">Stay updated in real-time.</p>
          </div>
        </div>
        <Switch
          checked={getNotification}
          onCheckedChange={(value) => setGetNotification(value)}
        />
      </div>
    </div>
  )
};

export default AccountSettings