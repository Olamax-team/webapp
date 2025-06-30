import  { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { activityIndex } from "../../stores/generalStore";
import ElectricityBills from "../dashboard/bills&payment/billsPayment/electricityBills";
import BillsDetails from "../dashboard/bills&payment/billsDetails";
import BettingBills from "../dashboard/bills&payment/billsPayment/bettingBills";
import CableTv from "../dashboard/bills&payment/billsPayment/cableTv";
import CowryBills from "../dashboard/bills&payment/billsPayment/cowryBills";
import WaterBills from "../dashboard/bills&payment/billsPayment/waterBills";
import useUserDetails from "../../stores/userStore";
import { useFetchStore } from "../../stores/fetch-store";

interface BillsPaymentProps {
    className?: string; // Additional class names for styling
};
type billsLinkProps = {
  index: number;
  active: number;
  name: string;
}
const BillsPayment:React.FC<BillsPaymentProps> = ({
  className,
})  => {
  const { user, fetchKycDetails } = useUserDetails();
const {fetchBills,} = useFetchStore();

  // ===== Effect Hooks =====
  // Fetch KYC details when user is available
useEffect(() => {
    if (user) {
        fetchKycDetails(); 
    }
}, [user])

const BillsIink = ({ index }: billsLinkProps) => {
  const { setActive } = activityIndex();

  return (
    <select
      key={index}
      value={cat0}
      onChange={(e) => {
        setCat0(e.target.value);
        setActive(index);
      }}
      className="ml-auto p-2 bg-white text-textDark rounded-md text-right"
    > 
        {categories.map((prop) => (
          <option key={prop} value={prop} className="text-center">
            {prop}
          </option>
        )
      )}
    </select>
  );
};

  const { active, showTransactionDetail, selectedBill } = activityIndex();
 // ===== Queries =====
  const { data: billServices, status: billServiceStatus } = useQuery({ queryKey: ['bills'], queryFn: fetchBills });
    // Derive categories from billServices.service

  const categories = billServices?.slice(2).map((service) => service.service) ?? [];
  // ===== Local State =====
  const [cat0, setCat0] = useState(categories[0]);

  
  const selectedIndex = categories.findIndex((cat) => cat === cat0);
  
  const renderBill = () => {
    switch (selectedIndex) {
      case 0:
        return <ElectricityBills/>;
      case 1:
        return <CableTv/>;
      case 2:
        return <WaterBills />;
      case 3:
        return <BettingBills />;
      case 4:
        return <CowryBills />;
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
                      key={selectedIndex}
                      index={selectedIndex}
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
export default BillsPayment;
