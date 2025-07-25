import React from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";
import { HiEllipsisVertical } from "react-icons/hi2";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { useApiConfig } from "../../../../hooks/api";
import axios from "axios";
import { Loader2 } from "lucide-react";

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

interface ResponseData {
  data: {
    bills: Bill[];
    buyings: Buying[];
    sellings: Selling[];
    sell_transactions: SellTransaction[];
  };
  counts: {
    topUp: number;
    bills: number;
    buyings: number;
    sell_transactions: number;
    total_user_transactions: number;
  };
  pagination: {
    bills: Pagination;
    buyings: Pagination;
    sellings: Pagination;
    sell_transactions: Pagination;
  };
}

interface Bill {
  bills_transaction_id: number;
  coin: Coin | null;
  blockchain: Blockchain;
  coin_value: string | null;
  naira_value: string;
  method: string;
  status: string;
  finished: string;
  exchange_value: string | null;
  type: string;
  billtype: string;
  payment_made: null;
  amount_paid: null;
  crypto_sent: null;
  product_number: string;
  customer_name: null;
  customernumber: null;
  notification_phone_number: null;
  invoice: null;
  ref: string;
  wallet_address: string | null;
  bank: string | null;
  bank_account: string | null;
  receiving_number: string;
  network: string;
  created_at: string;
  updated_at: string;
}

interface Buying {
  buy_transaction_id: number;
  coin: Coin | null;
  blockchain: Blockchain;
  coin_price: string | null;
  amount: number;
  dollar_rate: string;
  total_naira_plus_fees: string;
  method: string;
  payment_status: string;
  finished: string;
  wallet_address: string;
  payment_made: null;
  naira_amount_transfered: null;
  coin_to_send: number;
  transaction_contact: string;
  network_fees_dollar: string;
  network_fees_naira: string;
  created_at: string;
  updated_at: string;
  ref_no: string;
}

interface Selling {
  id: number;
  coin: null;
  virtual_account_id: number;
  address: string;
  ref: string;
  derivation_key?: number;
  currency: string;
  network: string;
  created_at: string;
  updated_at: string;
}

interface SellTransaction {
  sell_transaction_id: number;
  selling: {
    id: number;
    virtual_account_id: number;
    address: string;
    ref: string;
    currency: string;
    network: string;
    created_at: string;
    updated_at: string;
  };
  amount_sent: string;
  naira_value: string;
  status: string;
  coin: string;
  sell_details: {
    id: number;
    sell_transaction_id: number;
    account_name: string;
    account_number: string;
    bank_name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

interface Coin {
  coin_id: number;
  coin_name: string | null;
  coin: string | null;
}

interface Blockchain {
  blockchain_id: string | null;
}

interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
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


const TransactionHistory = () => {
  const getTranscationConfig = useApiConfig({
    url: `get-transactions-history`,
    method: 'get'
  });
  
  const fetchTranscations = async () => {
    const response = await axios.request(getTranscationConfig)

    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
  
    const data = response.data as ResponseData;
    return data;
  };

  const { data:allTransactionData, status } = useQuery({
    queryKey: ['some-tranasctions' ],
    queryFn: fetchTranscations,
    refetchInterval: 5000,
  });

  const billData = allTransactionData?.data.bills
  console.log(billData)

  const DesktopTable = () => {
    const [completedMenu, setCompletedMenu] = React.useState('save');

    if (status === 'pending') {
      return (
        <div className="w-full py-5 flex items-center justify-center">
          <Loader2 className="animate-spin w-full"/>
        </div>
      )
    };

    if (status === 'error') {
      return (
        <div className="w-full py-5 flex items-center justify-center text-red-500 font-semibold">
          Something went wrong while getting transaction history, refresh the page
        </div>
      )
    };

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
              <TableHead className="text-center font-bold">Coin Amount</TableHead>
              <TableHead className="text-center font-bold">Naira Amount</TableHead>
              <TableHead className="text-center font-bold">Status</TableHead>
              <TableHead className="text-center font-bold">Bill Type</TableHead>
              <TableHead className="text-center font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billData && billData.length > 0 && billData.map((item) => (
              <TableRow className="border-b-0 h-[60px] even:bg-white font-Inter even:hover:bg-white odd:bg-[#f5f5f5]">
                <TableCell className="text-center">{format(new Date(item.created_at), 'dd/MM/yyyy')}</TableCell>
                <TableCell className="text-center">{item.bills_transaction_id}</TableCell>
                <TableCell className="text-center">{item.type}</TableCell>
                <TableCell className="text-center">{item.coin?.coin_name}</TableCell>
                <TableCell className="text-center">{item.coin_value}</TableCell>
                <TableCell className="text-center">NGN{item.naira_value.toLocaleString()}</TableCell>
                <TableCell className='text-center'>{item.status}</TableCell>
                <TableCell className="text-center">{item.billtype}</TableCell>
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
