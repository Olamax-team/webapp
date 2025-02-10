import React from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";
import { HiEllipsisVertical } from "react-icons/hi2";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../../ui/dropdown-menu";

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
}

type mobileTransactionProps = {
  open: boolean;
  toggleTable: () => void;
  transaction: transactionItem;
}

const transactionList = [
  {
    id: 1,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Airtime Purchase',
    coins: 'USTD',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.5 '
  },
  {
    id: 2,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Data Purchase',
    coins: 'USTD',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.5 '
  },
  {
    id: 3,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Airtime Purchase',
    coins: 'USTD',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.5'
  },
];

const MobileTransactionItem = ({ open, toggleTable, transaction }: mobileTransactionProps) => {
  return (
    <div className={`font-Inter w-full odd:bg-white even:bg-inherit h-[68px] md:h-[72px] overflow-hidden p-3 md:p-4 cursor-pointer transition-all duration-300 ${open ? 'h-auto md:h-auto' : ''}`} onClick={toggleTable}>
      <div className="flex items-center justify-between">
        <p className="text-sm">{transaction.type}</p>
        <p className="text-sm">NGN{transaction.amount.toLocaleString()}</p>
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className={`text-center font-medium text-sm ${transaction.status === 'Pending' ? 'text-[#ff9c00]' : transaction.status === 'Completed' ? 'text-[#1faf38]' : 'text-[#e41d03]'}`}>{transaction.status}</p>
        <p className="text-sm text-black/40">{format(new Date(transaction.date), 'yyyy-MM-dd-HH:mm:ss')}</p>
      </div>
      <div className="border-b my-3" />
      <div className="flex items-center justify-between">
        <p className="text-sm">Tx ID</p>
        <p className="text-sm">{transaction.transaction_id}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Coins</p>
        <p className="text-sm">{transaction.coins}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Payment Method</p>
        <p className="text-sm">{transaction.payment_method}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Fees</p>
        <p className="text-sm">{transaction.fees} {transaction.coins}</p>
      </div>
    </div>
  );
};

const MobileTransactionTable = () => {
  const [currentIndex, setCurrentIndex] = React.useState(-1);

  const toggleTransactionItem = React.useCallback((index: number) => {
    setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
  }, []);

  return (
    <React.Fragment>
      {transactionList.map((item: transactionItem, index: number) => (
        <MobileTransactionItem 
          open={index === currentIndex} 
          toggleTable={() => toggleTransactionItem(index)} 
          key={index} 
          transaction={item}
        />
      ))}
    </React.Fragment>
  );
};

const TransactionHistory = () => {

  const DesktopTable = () => {
    const [completedMenu, setCompletedMenu] = React.useState('save');
    return(

      <div className="mt-8">
      {/* Desktop Table */}
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
              <TableCell className='text-center'>{item.status}</TableCell>
              <TableCell className="text-center">{item.fees} {item.coins} </TableCell>
              <TableCell className="flex items-center justify-center mt-1.5">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="outline-none">
                    <button type="button" className="flex items-center justify-center h-full w-full">
                      <HiEllipsisVertical className="size-7" />
                    </button>
                  </DropdownMenuTrigger>
                  {item.status === 'Completed' && (
                    <DropdownMenuContent className="rounded-xl">
                      <DropdownMenuRadioGroup value={completedMenu} onValueChange={setCompletedMenu}>
                        <DropdownMenuRadioItem value="save" className="rounded-lg">Save</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="report" className="rounded-lg">Report</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

     
    </div>

    )

  }

  return (
    <div>
      <h2 className="font-DMSans font-bold text-[26px] leading-normal">Transaction History</h2>
        {/* Mobile View - Only Visible on Small Screens */}

        <div className="mt-8 hidden lg:block">
          <DesktopTable  />
        </div>
        <div className=" mt-8  lg:hidden">
          <MobileTransactionTable />
        </div>
     
    </div>
  );
};

export default TransactionHistory;
