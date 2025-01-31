import { useState } from 'react';
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
import { IconType } from 'react-icons/lib';

interface Bill {
  name: string;
  icon: IconType;
}

const Bills = () => {
  const [activeButton, setActiveButton] = useState('crypto');
  const [active, setActive] = useState(0);
  const [showTransactionDetail, setShowTransactionDetail] = useState(true);
  const [selectedBill, setSelectedBill] = useState<string>('airtime'  );  

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
  
  const bills: Bill[] = [
    { name: 'Airtime Recharge', icon: HiOutlineDeviceMobile },
    { name: 'Data Purchase', icon: HiOutlineWifi },
    { name: 'Electricity Bill', icon: HiOutlineLightBulb },
    { name: 'Cable Tv', icon: HiOutlineDesktopComputer },
    { name: 'Water Bill', icon: IoWaterOutline },
    { name: 'Betting', icon: HiOutlineSupport },
    { name: 'Cowry Card', icon: FiCreditCard },
  ];

  // Added function to set the selected bill when clicked
  // const handleBillSelect = (index: number, billName: string) => {
  //   setActive(index);
  //   setSelectedBill(billName );  
  // };

    

  return (
    <section className="flex flex-col w-full items-center">
      {/* Conditionally render Bills or BillsDetails based on showTransactionDetail */}
      {!showTransactionDetail ? (
        <div className="xl:flex gap-10 w-full">
          {/* Bills Section */}
          <div className="xl:w-[50%] w-full xl:pt-6">
            <div className="top-[195px] text-[#121826]">
              <h1 className="font-bold font-Inter xl:font-DMSans text-[20px] leading-[30px] xl:text-[24px] xl:leading-[39px] text-[#121826]">
                Hello, Tosin Adebayor
              </h1>
              <p className="font-medium font-Inter text-[14px] leading-[21px]">
                What bill would you be paying today?
              </p>
            </div>

            <div className="w-full">
              <p className="mt-5 font-bold font-Inter text-[14px] xl:text-[18px] leading-[21px] xl:leading-[27px] text-[rgba(0,0,0,0.5)]">
                Select Bills Service
              </p>

              <div className="grid grid-cols-4 sm:grid-cols-3 xl:grid-cols-3 w-full md:gap-x-4 2xl:gap-x-6 gap-y-0 gap-x-3">
                {bills.map((bill, index) => (
                  <BillsIink
                    key={index} 
                    index={index}
                    setActive={setActive}  
                    active={active}
                    icon={bill.icon}
                    name={bill.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] rounded-md xl:w-[50%] w-full xl:h-[520px] mt-10 xl:mt-0 h-[420px]">
            <div className="px-8 py-6">
              <div className="flex gap-5 items-center">
                <button
                  onClick={() => setActiveButton('crypto')}
                  className={`w-[60px] xl:w-[80px] xl:h-[44px] h-[32px] rounded-md font-poppins font-bold text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] p-5 items-center justify-center flex ${activeButton === 'crypto' ? 'bg-[#f5f5f5] text-[#039AE4]' : 'bg-transparent text-[#121826]'}`}
                >
                  Crypto
                </button>
                <button
                  onClick={() => setActiveButton('FIAT')}
                  className={`font-Inter font-bold text-[14px] xl:text-[18px] xl:leading-[27px] leading-[21px] rounded-md xl:w-[80px] xl:h-[44px] w-[60px] h-[32px]  ${activeButton === 'FIAT' ? 'bg-[#f5f5f5] text-[#039AE4]' : 'bg-transparent text-[#121826]'}`}
                >
                  FIAT
                </button>
              </div>
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
