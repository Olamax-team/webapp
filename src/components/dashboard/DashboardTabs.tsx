import React, { useEffect, useRef, useState } from "react";
import BuySell from "../tradeCrypto/buy/buySell";
import { ArrowRightCircle, ShieldCheck } from "lucide-react";
import CryptoTodayGrid from "./CryptoTodayGrid";
import { HiOutlineDuplicate } from "react-icons/hi";
import TradeDetails from "./tradeDetails";
import { useConfirmVerificationModal } from "../../lib/utils";
import useUserDetails from "../../stores/userStore";
import { useApiConfig } from "../../hooks/api";
import axios from "axios";

interface UserInfoProps {
  name: string;
  email?: string;
  lastLogin: string;
  uid: string;
  isVerified: string;
  inviteLink: string;
};

const UserInfoCard: React.FC<UserInfoProps> = ({ name, lastLogin, uid, isVerified, email }) => {
  //clipboard copy function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(uid);
    alert("copied!");
  };

  const { user } = useUserDetails();
  console.log('user-details', user);

  const openConfirmVerification = useConfirmVerificationModal();
    // Mask email function
    // const maskEmail = (email: string) => {
    //   const [localPart, domain] = email.split("@");
    //   const maskedLocalPart = localPart.length > 3 ? `${localPart.slice(0, 3)}***` : `${localPart.slice(0, 1)}***`;

    //   // Mask everything in the domain except the top-level domain
    //   const [ , topLevelDomain] = domain.split(".");
    //   const maskedDomain = "***." + topLevelDomain;
    //   return `${maskedLocalPart}@${maskedDomain}`;
    // };

    const hasOpenedRef = useRef(false);

    useEffect(() => {
      if (isVerified === 'Unverified' && !hasOpenedRef.current) {
        openConfirmVerification.onOpen();
        hasOpenedRef.current = true; 
      }
    }, [isVerified, openConfirmVerification]);
  return (
    <div className="flex flex-col w-full h-auto">
      
        <div>
          {isVerified === 'Verified' ? (
            <h1 className="text-[20px] xl:text-[26px] leading-[30px] xl:leading-[39px] font-DMSans font-bold text-textDark">Hello, {name}</h1>
          ):(
              <h1 className="text-nowrap text-[20px] xl:text-[26px] leading-[30px] xl:leading-[39px] font-DMSans font-bold text-textDark">Hello, {email}</h1>
          )}
          <p className="text-[13px] xl:text-[14px] leading-[19.5px] xl:leading-[21px] font-medium font-Inter text-textDark">
            Last Login: {lastLogin}
          </p>
        </div>
     
        <div className="mt-[24px] flex items-center gap-16">
          <div className="flex flex-col items-start">
            <p className="mb-1 text-[13px] leading-[19.5px] font-normal font-Inter text-textDark">UID</p>
            <div className="flex space-x-1 justify-center">
                <span className="text-left text-[16px] leading-[24px] text-textDark font-Inter font-medium">{uid}</span>
                <HiOutlineDuplicate
                className="w-[24px] h-[24px] text-textDark cursor-pointer"
                onClick={copyToClipboard}
                />
            </div>
        </div>
        <div className="font-Inter w-full h-auto">
        {user && user.account_status === 'Verified' ? (
          <>
            <div className="flex flex-col">
              <p className="mb-1 text-[14px] leading-[21px] font-normal text-textDark">
                Identity Verification
              </p>
              <div className="flex gap-1 items-start">
                <ShieldCheck className="w-[24px] h-[24px] text-[#34A853]" />
                <span className="text-[16px] leading-[24px] font-medium text-[#34A853]">
                  {user.account_status}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <p className="mb-1 text-[14px] leading-[21px] font-normal text-textDark">
                Identity Verification
              </p>
              <div className="flex gap-1 items-start">
                <ShieldCheck className="w-[24px] h-[24px] text-[#FF9C00]" />
                <span 
                onClick={() => {openConfirmVerification.onOpen();}}
                className="text-[16px] leading-[24px] font-medium text-[#FF9C00] cursor-pointer">
                  {user && user.account_status}
                </span>
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
    <div className="p-6 justify-center flex flex-col w-full h-auto bg-primary bg-opacity-20 rounded-lg mt-6 font-Inter">
      <div className="mb-6">
        <h2 className="mb-2 text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] font-bold text-textDark">Our Services</h2>
        <p className="text-[13px] leading-[19.5px] xl:text-[14px] xl:leading-[21px] font-medium text-textDark mb-4">Explore the range of our services</p>
      </div>
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg mb-8 cursor-pointer"
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
  const { user:userDetail, fetchKycDetails, fetchKycStatus, kycDetails, kycStatus } = useUserDetails();

  React.useEffect(() => {
    if (userDetail) {
      fetchKycDetails();
      fetchKycStatus();
    }
  },[userDetail]);

  console.log(userDetail)
  console.log('kyc-status', kycStatus );
  console.log('account-status', kycDetails );

  const user = {
    name: kycDetails ? `${kycDetails.lname+' '+kycDetails.fname }`: '' ,
    email: kycDetails ? kycDetails.email : userDetail?.email,
    lastLogin: userDetail?.last_login_location || '',
    uid: userDetail?.UID || '',
    isVerified: userDetail?.account_status || 'Unverified',
    inviteLink: "https://olamax.io/"
  };
  
  const services = [
    {
      title: "Buy Airtime & Data",
      description: "Top-up your devices with ease",
      icon: <div className="flex w-[40px] h-[40px] items-center justify-center bg-white rounded-full">
                <img src={"/images/phone.png"} alt="phone" className="w-[24px] h-[24px]"/>
            </div>,
    },
    {
      title: "Pay Utilities",
      description: "Pay your bills with ease",
      icon: <div className="flex w-[40px] h-[40px] items-center justify-center bg-white rounded-full">
                <img src={"/images/electricity.png"} alt="phone" className=""/>
            </div>,
    },
  ];

  const props1 = ["NGN", "USD", "EUR", "GBP"];
  const props2currency = ["BTC","ETH", "USDT", "SOL" ];
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [tradeType, setTradeType] = useState<string>('');

  const coinConfig = useApiConfig({
    url:'coin-prices',
    method:'get',
  });

  const liveRateConfig = useApiConfig({
    url:'price-ticker',
    method:'get',
  });

  const getCoinByNameConfig = useApiConfig({
    url: 'coin-naira-value/selling',
    method: 'get'
  });

  const cryptoServiceConfig = useApiConfig({
    url: 'coin-naira-value/selling',
    method: 'get'
  });

  const getKycDetailsConfig = useApiConfig({
    url: 'get-kyc-details/kyc-status',
    method: 'get'
  });

  React.useEffect(()=> {
    const fetchLiveRates = () => {
      axios.request(liveRateConfig)
      .then((response) => {
        if (response.status === 200) {
          console.log('live-rates', response.data.price_ticker)
        };
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching data message:", error.response?.data.message || error.message);        
        } else {
          console.error("Unexpected error:", error);
        }; 
      });
    };
    fetchLiveRates();
  },[]);

  React.useEffect(()=> {
    const fetchAllCoinPrices = () => {
      axios.request(coinConfig)
      .then((response) => {
        if (response.status === 200) {
          console.log('all-coin-price', response.data)
        };
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching data message:", error.response?.data.message || error.message);        
        } else {
          console.error("Unexpected error:", error);
        }; 
      });
    };
    fetchAllCoinPrices();
  },[]);

  React.useEffect(()=> {
    const fetchCoinByName = () => {
      axios.request(getCoinByNameConfig )
      .then((response) => {
        if (response.status === 200) {
          console.log('coin-by-name', response.data)
        };
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching data message:", error.response?.data.message || error.message);        
        } else {
          console.error("Unexpected error:", error);
        }; 
      });
    };
    fetchCoinByName();
  },[]);

  React.useEffect(()=> {
    const fetchCryptoService = () => {
      axios.request(cryptoServiceConfig)
      .then((response) => {
        if (response.status === 200) {
          console.log('crypto-services', response.data)
        };
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching data message:", error.response?.data.message || error.message);        
        } else {
          console.error("Unexpected error:", error);
        }; 
      });
    };
    fetchCryptoService();
  },[]);

  React.useEffect(()=> {
    const fetchKycDetails = () => {
      axios.request(getKycDetailsConfig)
      .then((response) => {
        if (response.status === 200) {
          console.log('kyc-details', response.data)
        };
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching data message:", error.response?.data.message || error.message);        
        } else {
          console.error("Unexpected error:", error);
        }; 
      });
    };
    fetchKycDetails();
  },[]);

  return (
    <section className="flex flex-col w-full items-center h-auto space-y-2">
      {!showTransactionDetail ? (
        <>
          <div className="flex w-full flex-col xl:flex-row gap-10 items-center">
            {/* Left Section */}
            <div className="my-auto w-full xl:w-[50%] h-auto">
              <UserInfoCard
                name={user.name}
                email={user.email}
                lastLogin={user.lastLogin}
                uid={userDetail?.UID || ''}
                isVerified={kycStatus?.status || 'Unverified'}
                inviteLink={user.inviteLink}
              />
              <ServicesCard services={services} />
            </div>
            
            {/* Right Section */}
            <div className="w-full xl:w-[50%] h-auto px-4 xl:p-4 bg-white rounded-md">
              <BuySell props1Currency={props1} props2Currency={props2currency} setTradeType={setTradeType} setShowTransactionDetail={setShowTransactionDetail} className="mb-4 xl:mb-0"/>
            </div>
          </div>
          <div className="flex justify-center w-full">
              <div className="rounded-lg flex-grow w-full">
                <CryptoTodayGrid userInvite={user.inviteLink}/>
              </div>
          </div>
        </>
      ) : (
        <TradeDetails
          activeInput={tradeType}
          setShowTransactionDetail={setShowTransactionDetail}
          />

      )}
    </section>
  );
};

export default DashboardTab;
