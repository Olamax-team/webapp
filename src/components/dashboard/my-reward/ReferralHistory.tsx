import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { format } from "date-fns";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { HiEllipsisVertical } from "react-icons/hi2";
import { cn } from "../../../lib/utils";

type transactionItem = {
  id: number;
  date: string;
  transaction_id: string;
  type: string;
  coins: string;
  payment_method: string;
  amount: number;
  status: string;
  fees: string;
};

type mobileTransactionItem = {
  id: number;
  date: string;
  name: string;
  amount: number;
  amount_traded: number;
  status: string;
};

type mobileTransactionProps = {
  open: boolean;
  toggleTable: () => void;
  transaction: mobileTransactionItem;
}


const transactionList = [
  {
    id: 1,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Airtime',
    coins: 'USDT',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Pending',
    fees: '0.5'
  },
  {
    id: 2,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Data',
    coins: 'USDT',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.5'
  },
  {
    id: 3,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Buy',
    coins: 'BTC',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Cancelled',
    fees: '0.005'
  },
  {
    id: 4,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Sell',
    coins: 'BTC',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.005'
  },
  {
    id: 5,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Buy',
    coins: 'ETH',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.005'
  },
  {
    id: 6,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Data',
    coins: 'SOL',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.005'
  },
  {
    id: 7,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Airtime',
    coins: 'USDT',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.05'
  },
  {
    id: 8,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Buy',
    coins: 'ETH',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Cancelled',
    fees: '0.05'
  },
  {
    id: 9,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Airtime',
    coins: 'USDT',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Pending',
    fees: '0.5'
  },
];

const mobileList = [
  {
    id: 1,
    date: '2025-01-09T23:00:00.000Z',
    name: 'Samuel Sunday',
    amount: 1000,
    amount_traded: 10000,
    status: 'Verified',
  },
  {
    id: 2,
    date: '2025-01-09T23:00:00.000Z',
    name: 'Samuel Sunday',
    amount: 0,
    amount_traded: 10000,
    status: 'Not Verified',
  },
  {
    id: 3,
    date: '2025-01-09T23:00:00.000Z',
    name: 'Samuel Sunday',
    amount: 1000,
    amount_traded: 10000,
    status: 'Verified',
  },
  {
    id: 4,
    date: '2025-01-09T23:00:00.000Z',
    name: 'Samuel Sunday',
    amount: 1000,
    amount_traded: 10000,
    status: 'Verified',
  },
  {
    id: 5,
    date: '2025-01-09T23:00:00.000Z',
    name: 'Samuel Sunday',
    amount: 1000,
    amount_traded: 10000,
    status: 'Verified',
  },
];

const ReferralHistory = () => {

  const DesktopReferralHistoryTable = () => {
    const [pendingMenu, setPendingMenu] = React.useState('view');
    const [completedMenu, setCompletedMenu] = React.useState('save');

    return (
      <Table>
        <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b-0">
          <TableRow className="bg-white hover:bg-white border-b-0 font-Inter">
            <TableHead className="text-center font-bold">Date</TableHead>
            <TableHead className="text-center font-bold">Transaction ID</TableHead>
            <TableHead className="text-center font-bold">Type</TableHead>
            <TableHead className="text-center font-bold">Coins</TableHead>
            <TableHead className="text-center font-bold">Payment Method</TableHead>
            <TableHead className="text-center font-bold">Amount</TableHead>
            <TableHead className="text-center font-bold">Status</TableHead>
            <TableHead className="text-center font-bold">Fees</TableHead>
            <TableHead className="text-center font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionList.map((item) => (
            <TableRow className="border-b-0 h-[60px] even:bg-white font-Inter even:hover:bg-white odd:bg-[#f5f5f5]">
              <TableCell className="text-center">{format(new Date(item.date), 'dd/MM/yyyy')}</TableCell>
              <TableCell className="text-center">{item.transaction_id}</TableCell>
              <TableCell className="text-center">{item.type}</TableCell>
              <TableCell className="text-center">{item.coins}</TableCell>
              <TableCell className="text-center">{item.payment_method}</TableCell>
              <TableCell className="text-center">NGN{item.amount.toLocaleString()}</TableCell>
              <TableCell className={cn("text-center font-medium", item.status === 'Pending' ? 'text-[#ff9c00]': item.status === 'Completed' ? 'text-[#1faf38]': 'text-[#e41d03]')}>{item.status}</TableCell>
              <TableCell className="text-center">{item.fees} {item.coins}</TableCell>
              <TableCell className="flex items-center justify-center mt-1.5">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="outline-none">
                    <button type="button" className="flex items-center justify-center h-full w-full">
                      <HiEllipsisVertical className="size-7"/>
                    </button>
                  </DropdownMenuTrigger>
                  { item.status === 'Pending' ?
                    <DropdownMenuContent className="rounded-xl">
                      <DropdownMenuRadioGroup value={pendingMenu} onValueChange={setPendingMenu}>
                        <DropdownMenuRadioItem value="view" className="rounded-lg">View</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="cancel" className="rounded-lg">Cancel</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent> :
                    item.status === 'Completed' ?
                    <DropdownMenuContent className="rounded-xl">
                      <DropdownMenuRadioGroup value={completedMenu} onValueChange={setCompletedMenu}>
                        <DropdownMenuRadioItem value="save" className="rounded-lg">Save</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="report" className="rounded-lg">Report</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent> :
                    ''}
                </DropdownMenu>
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
          <p className="text-sm">{transaction.name}</p>
          <p className="text-sm">{transaction.amount > 0 ? 'NGN': ''}{transaction.amount > 0 ? transaction.amount.toLocaleString() : "---" }</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className={cn("text-center font-medium text-sm", transaction.status === 'Verified' ? 'text-[#1faf38]': 'text-[#ff9c00]')}>{transaction.status}</p>
          <p className="text-sm text-black/40">{format(new Date(transaction.date), 'yyyy-MM-dd-HH:mm:ss')}</p>
        </div>
        <div className="border-b my-3"/>
        <div className="flex items-center justify-between">
          <p className="text-sm">Amount Traded:</p>
          <p className="text-sm">NGN{transaction.amount_traded.toLocaleString()}</p>
        </div>
        {transaction.status === 'Verified' &&
          <div className="pt-2">
            <button className="text-sm border-b border-primary text-primary">Contact admin</button>
          </div>
        }
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
        {mobileList.map((item:mobileTransactionItem, index:number) => (
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
      <div className="lg:hidden">
        <MobileReferralHistoryTable/>
      </div>
    </div>
  )
}

export default ReferralHistory