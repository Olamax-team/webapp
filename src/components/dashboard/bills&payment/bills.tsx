import { useState, useEffect } from 'react';
import AirtimeRecharge from './billsPayment/airtimeRecharge';
import Datapurchase from './billsPayment/datapurchase';
import ElectricityBills from './billsPayment/electricityBills';
import CableTv from './billsPayment/cableTv';
import WaterBills from './billsPayment/waterBills';
import BettingBills from './billsPayment/bettingBills';
import CawryBills from './billsPayment/cowryBills';
import BillsIink from './billsPayment/billsIink';
import BillsDetails from './billsDetails';
import TransactionHistory from './billsPayment/transactionHistory';
import { HiOutlineDeviceMobile, HiOutlineWifi, HiOutlineLightBulb, HiOutlineDesktopComputer, HiOutlineSupport } from 'react-icons/hi';
import { IoWaterOutline } from 'react-icons/io5';
import { FiCreditCard } from 'react-icons/fi';
import useUserDetails from '../../../stores/userStore';
import { useApiConfig } from '../../../hooks/api';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { activityIndex } from '../../../stores/generalStore';

interface billProps {
  service: string;
  icon: string;
  label: string
}

const Bills = () => {
  const { active } = activityIndex()
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [selectedBill, setSelectedBill] = useState<string>('');  

  const { user, fetchKycDetails, kycDetails } = useUserDetails();

  useEffect(() => {
    if (user) {
      fetchKycDetails();
    }
  }, [user]);

  const billsConfig = useApiConfig({
    method: 'get',
    url: 'get-bills'
  });

  const fetchBillServices = async () => {
    const response = await axios.request(billsConfig);
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.services as billProps[];
    return data;
  };


  const { data:billsList, status} = useQuery({
    queryKey: ['bills-list'],
    queryFn: fetchBillServices,
  });

  const renderBill = () => {
    switch (active) {
      case 0:
        return <AirtimeRecharge setShowTransactionDetail={setShowTransactionDetail}   setSelectedBill={setSelectedBill}/>;
      case 1:
        return <Datapurchase setShowTransactionDetail={setShowTransactionDetail}   setSelectedBill={setSelectedBill}  />;
      case 2:
        return <ElectricityBills  setShowTransactionDetail={setShowTransactionDetail}   setSelectedBill={setSelectedBill} />;
      case 3:
        return <CableTv setShowTransactionDetail={setShowTransactionDetail}   setSelectedBill={setSelectedBill} />;
      case 4:
        return <WaterBills setShowTransactionDetail={setShowTransactionDetail}   setSelectedBill={setSelectedBill} />;
      case 5:
        return <BettingBills setShowTransactionDetail={setShowTransactionDetail}   setSelectedBill={setSelectedBill} />;
      case 6:
        return <CawryBills setShowTransactionDetail={setShowTransactionDetail}   setSelectedBill={setSelectedBill}    />;
      default:
        return null;
    }
  };

  const renderIcons = (billsName:string) => {
    switch (billsName) {
      case 'Airtime Recharge':
        return HiOutlineDeviceMobile;
      case 'Data Purchase':
        return HiOutlineWifi;
      case 'Electricity Bill':
        return HiOutlineLightBulb;
      case 'Cable Tv':
        return HiOutlineDesktopComputer;
      case 'Water Bill':
        return IoWaterOutline;
      case 'Betting':
        return HiOutlineSupport;
      case 'Cowry Card':
        return FiCreditCard;
      default:
        return HiOutlineDeviceMobile;
    } 
  }
  
  return (
    <section className="flex flex-col w-full items-center">
      {!showTransactionDetail ? (
        <div className="xl:flex gap-10 w-full">
          <div className="xl:w-[50%] w-full xl:pt-6">
            <div className="top-[195px] text-[#121826]">
              <h1 className="font-bold font-Inter xl:font-DMSans text-[20px] leading-[30px] xl:text-[24px] xl:leading-[39px] text-[#121826]">
                Hello, {kycDetails?.fname} {kycDetails?.lname}
              </h1>
              <p className="font-medium font-Inter text-[14px] leading-[21px]">
                What bill would you be paying today?
              </p>
            </div>

            <div className="w-full">
              <p className="mt-5 font-bold font-Inter text-[14px] xl:text-[18px] leading-[21px] xl:leading-[27px] text-[rgba(0,0,0,0.5)]">
                Select Bills Service
              </p>
              { status === 'pending' &&
                <div className='w-full py-6 flex items-center justify-center gap-3'>
                  Loading Available Services
                  <Loader2 className='animate-spin'/>
                </div>
              }

              { status === 'success' && billsList.length < 1 &&
                <div className='w-full py-6 flex items-center justify-center gap-3'>
                  No Available Services. Check Back later
                </div>
              }

              { status === 'error' &&
                <div className='w-full py-6 flex items-center justify-center gap-3 text-red-500'>
                  Error occured while loading available services. Refresh the page.
                </div>
              }

              { status === 'success' && billsList && <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 w-full md:gap-x-4 2xl:gap-x-6 gap-y-0 gap-x-3">
                {billsList && billsList.length > 0 && billsList.map((bill, index) => (
                  <BillsIink
                    key={index} 
                    index={index}
                    active={active}
                    icon={renderIcons(bill.service)}
                    name={bill.service}
                  />
                ))}
              </div> }
            </div>
          </div>

          <div className="bg-[#ffffff] rounded-md xl:w-[50%] w-full xl:h-[auto] mt-10 xl:mt-0 h-auto">
            <div className="px-8 py-6">
              <div className="">{renderBill()}</div>
            </div>

           
          </div>
        </div>
      ) : (
        <BillsDetails
          activeInput = {selectedBill}
          setShowTransactionDetail={setShowTransactionDetail} 
        />
      )}

      <div className="w-full h-auto mt-10">
        <TransactionHistory />
      </div>
    </section>
  );
};

export default Bills;
