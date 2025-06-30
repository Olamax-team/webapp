
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";


import { useFetchStore } from "../../stores/fetch-store";
import { activityIndex } from "../../stores/generalStore";
import useUserDetails from "../../stores/userStore";

import AirtimeRecharge from "../dashboard/bills&payment/billsPayment/airtimeRecharge";

import Datapurchase from "../dashboard/bills&payment/billsPayment/datapurchase";
import { Loader2 } from "lucide-react";
import BillsDetails from "../dashboard/bills&payment/billsDetails";


// ===== Types =====
interface airtimePaymentProps {
  className?: string;
  airtimeOptions: string[];
}

type billsLinkProps = {
  index: number;
  active: number;
  name: string;
}
// ===== Component =====
const AirtimePayment: React.FC<airtimePaymentProps> = ({
  className,
  airtimeOptions,
}) => {
  const { active, showTransactionDetail, selectedBill } = activityIndex();
  const { user, fetchKycDetails } = useUserDetails();

  const {
    fetchBillServices,
  } = useFetchStore();

  // ===== Effect Hooks =====
  // Fetch KYC details when user is available
useEffect(() => {
    if (user) {
        fetchKycDetails(); 
    }
}, [user])

const BillsIink = ({ index}: billsLinkProps) => {
  const { setActive } = activityIndex();

  return (
    <select
    key={index}
    value={cat0}
    onChange={(e) => { setCat0(e.target.value);        
        setActive(index); }}
    className="ml-auto p-2 bg-white text-textDark rounded-md text-right"
>
    {airtimeOptions.map((prop) => (
    <option key={prop} value={prop} className="text-center">
        {prop}
    </option>
    ))}
</select>
  );
};

  // ===== Queries =====
  const { data: billServices, status: billServiceStatus } = useQuery({ queryKey: ['bills-service'], queryFn: fetchBillServices });

  // ===== Local State =====
  const [cat0, setCat0] = useState("Airtime");
  
  const renderBill = () => {
    switch (active) {
      case 0:
        return <AirtimeRecharge />;
      case 1:
        return <Datapurchase />;
      default:
        return null;
    }
  };

      
  return (
     <div className={`space-y-2 w-full ${className || ""}`}>
        {!showTransactionDetail ? (
          <>
            {billServiceStatus === 'pending' && (
              <div className='w-full py-6 flex items-center justify-center gap-3'>
                Loading Available Services
                <Loader2 className='animate-spin'/>
              </div>
            )}

            {billServiceStatus === 'success' && billServices && billServices.length < 1 && (
              <div className='w-full py-6 flex items-center justify-center gap-3'>
                No Available Services. Check Back later
              </div>
            )}

            {billServiceStatus === 'error' && (
              <div className='w-full py-6 flex items-center justify-center gap-3 text-red-500'>
                Error occured while loading available services. Refresh the page.
              </div>
            )}

            {billServiceStatus === 'success' && billServices && billServices.length > 0 && (
              <>
                <div className="flex justify-center space-x-4">
                  <div className="font-Inter flex items-center w-full h-[60px] justify-between bg-white px-3 rounded-md text-textDark">
                    <p className="leading-[18px] font-[500] text-[12px] xl:leading-[21px] xl:text-[14px]">
                      Choose Category
                    </p>
                        <BillsIink
                            key={cat0 === "Airtime" ? 1 : 0}
                            index={cat0 === "Airtime" ? 1 : 0}
                            active={active}
                            name={cat0}
                        />
                  </div>
                </div>
                <div className="">{renderBill()}</div>
              </>
            )}
          </>
        ) : (<BillsDetails activeInput = {selectedBill}/>
      )}
    </div>
  );
}

export default AirtimePayment;
