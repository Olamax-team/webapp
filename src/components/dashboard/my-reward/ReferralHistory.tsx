import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";
import { referralsList } from "../../../assets/constants";


type transactionItem = {
  id: number;
  date: string;
  referred_user: string;
  commission_amount: number;
  amount_traded: number;
  trading_status: string;
  status: string;
  action: string;
};

type mobileTransactionProps = {
  open: boolean;
  toggleTable: () => void;
  transaction: transactionItem;
};

const ReferralHistory = () => {

  const DesktopReferralHistoryTable = () => {

    return (
      <Table>
        <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b-0">
          <TableRow className="bg-white hover:bg-white border-b-0 font-Inter">
            <TableHead className="text-center font-bold">S/N</TableHead>
            <TableHead className="text-center font-bold">Referred User</TableHead>
            <TableHead className="text-center font-bold">Status</TableHead>
            <TableHead className="text-center font-bold">Trading Status</TableHead>
            <TableHead className="text-center font-bold">Amount</TableHead>
            <TableHead className="text-center font-bold">Commision</TableHead>
            <TableHead className="text-center font-bold">Date</TableHead>
            <TableHead className="text-center font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {referralsList.map((item:transactionItem, index:number) => (
            <TableRow className="border-b-0 h-[60px] even:bg-white font-Inter even:hover:bg-white odd:bg-[#f5f5f5]" key={item.id}>
              <TableCell className="text-center">{index+1}</TableCell>
              <TableCell className="text-center">{item.referred_user}</TableCell>
              <TableCell className={cn("text-center font-medium text-sm", item.status === 'Verified' ? 'text-[#1faf38]': 'text-[#ff9c00]')}>{item.status}</TableCell>
              <TableCell className="text-center">{item.trading_status}</TableCell>
              <TableCell className="text-center">{item.amount_traded > 0 ? 'NGN': ''}{item.amount_traded > 0 ? item.amount_traded.toLocaleString() : "---" }</TableCell>
              <TableCell className="text-center">{item.commission_amount > 0 ? 'NGN': ''}{item.commission_amount > 0 ? item.commission_amount.toLocaleString() : "---" }</TableCell>
              <TableCell className="text-center">{format(new Date(item.date), 'dd/MM/yyyy')}</TableCell>
              <TableCell className="flex items-center justify-center">
                <button className="text-sm border-b border-primary text-primary mt-2">{item.action}</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  };

  const MobileReferralHistoryItem = ({open, toggleTable, transaction}:mobileTransactionProps) => {

    return (
      <div className={cn("font-Inter w-full odd:bg-white even:bg-inherit h-[68px] md:h-[72px] overflow-hidden p-3 md:p-4 cursor-pointer transition-all duration-300", open ? 'h-auto md:h-auto': '')} onClick={toggleTable}>
        <div className="flex items-center justify-between">
          <p className="text-sm">{transaction.referred_user}</p>
          <p className="text-sm">{transaction.commission_amount > 0 ? 'NGN': ''}{transaction.commission_amount > 0 ? transaction.commission_amount.toLocaleString() : "---" }</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className={cn("text-center font-medium text-sm", transaction.status === 'Verified' ? 'text-[#1faf38]': 'text-[#ff9c00]')}>{transaction.status}</p>
          <p className="text-sm text-black/40">{format(new Date(transaction.date), 'yyyy-MM-dd-HH:mm:ss')}</p>
        </div>
        <div className="border-b my-3"/>
        <div className="flex items-center justify-between">
          <p className="text-sm">Amount Traded:</p>
          <p className="text-sm">{transaction.amount_traded > 0 ? 'NGN': ''}{transaction.amount_traded > 0 ? transaction.amount_traded.toLocaleString() : "---" }</p>
        </div>
        <div className="pt-2">
          <button className="text-sm border-b border-primary text-primary">{transaction.action}</button>
        </div>
      </div>
    )
  };

  const MobileReferralHistoryTable = () => {
    const [currentIndex, setCurrentIndex] = React.useState(-1);

    const toggleTranscationItem = React.useCallback((index: number) => {
      setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
    },[]);

    return (
      <React.Fragment>
        {referralsList.map((item:transactionItem, index:number) => (
          <MobileReferralHistoryItem
            key={index} 
            open={index === currentIndex} 
            toggleTable={() => toggleTranscationItem(index)} 
            transaction={item}
          />
        ))}
      </React.Fragment>
    )
  };

  return (
    <div className="flex flex-col gap-12">
      <p className="text-[20px] leading-normal font-bold text-center lg:text-left">Referral History</p>
      <div className="hidden lg:block">
        <DesktopReferralHistoryTable/>
      </div>
      <div className="lg:hidden">
        <MobileReferralHistoryTable/>
      </div>
    </div>
  )
}

export default ReferralHistory