import React from "react";
import BuySell from "../tradeCrypto/buy/buySell";
import { ArrowRightCircle, ClipboardIcon, ShieldCheck } from "lucide-react";
import CryptoTodayGrid from "./CryptoTodayGrid";
import { HiDuplicate } from "react-icons/hi";

interface UserInfoProps {
  name: string;
  lastLogin: string;
  location: string;
  uid: string;
  isVerified: boolean;
  inviteLink: string;
}

const UserInfoCard: React.FC<UserInfoProps> = ({ name, lastLogin, location, uid, isVerified }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(uid);
    alert("copied!");
  };

  return (
    <div className="w-[274px] h-[139px] xl:h-[136px] xl:w-[295px]">
      <div>
        <h1 className="text-[20px] xl:text-[26px] leading-[30px] xl:leading-[39px] font-DMSans font-bold text-textDark">Hello, {name}</h1>
        <p className="text-[13px] xl:text-[14px] leading-[19.5px] xl:leading-[21px] font-medium font-Inter text-textDark">
          Last Login: {lastLogin} {location}
        </p>
      </div>
      <div className="mt-[24px] flex items-center justify-between">
        <div className="grid grid-cols-1 items-start">
            <p className="mb-1 text-[13px] leading-[19.5px] font-normal font-Inter text-textDark">UID</p>
            <div className="flex space-x-1 justify-center">
                <span className="text-left text-[16px] leading-[24px] text-textDark font-Inter font-medium">{uid}</span>
                <ClipboardIcon
                className="w-[24px] h-[24px] text-textDark cursor-pointer"
                onClick={copyToClipboard}
                />
            </div>
        </div>
        <div className="font-Inter w-[129px] h-[53px]">
          {isVerified && (
            <>
                <div className="grid grid-cols-1">
                    <p className="mb-1 text-[14px] leading-[21px] font-normal text-textDark">Identity Verification</p>
                    <div className="flex gap-3 items-start">
                        <ShieldCheck className="w-[24px] h-[24px] text-[#34A853]" />
                        <span className="text-[16px] leading-[24px] font-medium text-[#34A853]">Verified</span>
                    </div>
                </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface ServicesProps {
  services: { title: string; description: string; icon: JSX.Element }[];
}

const ServicesCard: React.FC<ServicesProps> = ({ services }) => {
  return (
    <div className="p-6 justify-center w-[356px] xl:w-[420px] h-[232px] xl:h-[260px] bg-primary bg-opacity-20 rounded-lg mt-6 font-Inter">
      <div className="mb-6">
        <h2 className="mb-2 text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] font-bold text-textDark">Our Services</h2>
        <p className="text-[13px] leading-[19.5px] xl:text-[14px] xl:leading-[21px] font-medium text-textDark mb-4">Explore the range of our services</p>
      </div>
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg mb-8"
        >
          <div className="flex text-[16px] leading-[24px] items-center space-x-4">
            {service.icon}
            <div>
              <h3 className="text-sm font-medium text-textDark">{service.title}</h3>
              <p className="text-xs text-textDark">{service.description}</p>
            </div>
          </div>
          <ArrowRightCircle className="w-5 h-5 text-textDark" />
        </div>
      ))}
    </div>
  );
};

const DashboardTab: React.FC = () => {
  const user = {
    name: "Tosin Adebayor",
    lastLogin: "21/11/2024, 16:03",
    location: "Lagos, Nigeria",
    uid: "20921123",
    isVerified: true,
    inviteLink: "https://olamax.io/"
  };

  const services = [
    {
      title: "Buy Airtime & Data",
      description: "Top-up your devices with ease",
      icon: <div className="flex w-[40px] h-[40px] items-center justify-center bg-white rounded-full">
                <img src="../../../src/assets/images/phone.png" alt="phone" className="w-[24px] h-[24px]"/>
            </div>,
    },
    {
      title: "Pay Utilities",
      description: "Pay your bills with ease",
      icon: <div className="flex w-[40px] h-[40px] items-center justify-center bg-white rounded-full">
                <img src="../../../src/assets/images/electricity.png" alt="phone" className=""/>
            </div>,
    },
  ];
  const props1 = ["NGN", "USD", "EUR", "GBP"];
  const props2currency = ["BTC","ETH", "USDT", "SOL" ];

  return (
    <div className="p-4 md:p-10 mx-auto my-auto">
      <div className="mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 justify-center xl:w-[980px]">
        {/* Left Section */}
        <div className="my-auto w-[420px] h-[428px]">
          <UserInfoCard
            name={user.name}
            lastLogin={user.lastLogin}
            location={user.location}
            uid={user.uid}
            isVerified={user.isVerified}
            inviteLink={user.inviteLink}
          />
          <ServicesCard services={services} />
        </div>
        
        {/* Right Section */}
        <div className="px-4 xl:p-4 w-[356px] h-[400px] xl:w-[500px] xl:h-[520px] bg-white rounded-md">
          <BuySell props1Currency={props1} props2Currency={props2currency}/>
        </div>

        <div className="xl:col-span-4 grid grid-cols-3">
        <   div className="rounded-lg xl:col-span-2">
                <CryptoTodayGrid userInvite={user.inviteLink}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
