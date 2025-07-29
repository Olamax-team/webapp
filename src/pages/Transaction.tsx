import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { cn, documentTitle } from "../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { HiOutlineCalendar, HiOutlineSearch } from "react-icons/hi";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { HiEllipsisVertical } from "react-icons/hi2";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useApiConfig } from "../hooks/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";


// interface transaction {
//   id: number;
//   user_id: number;
//   created_at: string;
//   ref: string;
//   coin_id: string;
//   coin_name: string;
//   payment_method: string;
//   naira_value: number;
//   payment_status: string;
//   transaction_charges: number | null;
//   type: string;
// }

// interface link {
//   url: string | null;
//   label: string;
//   active: boolean;
// }

// interface transactionHistory {
//   current_page: number;
//   data: transaction[];
//   first_page_url: string;
//   from: number;
//   last_page: number;
//   last_page_url: string;
//   links: link[];
//   next_page_url: string | null;
//   path: string;
//   per_page: number;
//   prev_page_url: string | null;
//   to: number;
//   total: number;
// }

// type transactionProps = {
//   id: number;
//   user_id: number;
//   created_at: string;
//   ref: string;
//   coin_id: string;
//   coin_name: string;
//   payment_method: string;
//   naira_value: number;
//   payment_status: string;
//   transaction_charges: string;
//   type: string;
// };

type dateComponentProps = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  placeholder: string;
};

type mobileTransactionProps = {
  open: boolean;
  toggleTable: () => void;
  transaction: BuyTransaction
};

type mobileSellTransactionProps = {
  open: boolean;
  toggleTable: () => void;
  transaction: SellTransaction
};

type mobileBillsTransactionProps = {
  open: boolean;
  toggleTable: () => void;
  transaction: BillsTransaction
};

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface BuyTransaction {
  id: number;
  created_at: string;
  ref: string;
  coin_id: string;
  coin_name: string;
  payment_method: string;
  naira_amount_to_buy: number;
  naira_amount_transfered: number | null;
  coin_to_receive: number;
  coin_amount_to_buy: number;
  payment_status: string;
  transaction_charges: string;
  type: string;
}

export interface SellTransaction {
  id: number,
  created_at: string;
  ref: string;
  coin_id: string;
  coin_name: string;
  coin_amount_to_sell: string;
  naira_value_to_sell: string;
  wallet_address: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  phone_number: string;
  payment_status: string;
  type: string;
}

export interface BillsTransaction {
    id: number;
    created_at: string;
    ref: string;
    coin_id: string;
    coin_name: string;
    payment_method: string;
    naira_amount_to_buy: string;
    naira_amount_transfered: string;
    coin_amount_to_buy: string;
    payment_status: string;
    deposit_address: string;
    crypto_sent: string | null;
    bill_type: string;
    type: string;
}

export interface PaginatedSellTransactionResponse {
  current_page: number;
  data: SellTransaction[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PaginatedBuyTransactionResponse {
  current_page: number;
  data: BuyTransaction[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export interface PaginatedBillsTransactionResponse {
  current_page: number;
  data: BillsTransaction[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const Transaction = () => {
  documentTitle('Transaction');

  const [fromDate, setFromDate] = React.useState<Date | undefined>();
  const [toDate, setToDate] = React.useState<Date | undefined>();
  const [activeTab, setActiveTab] = React.useState('buy')

  const formattedTo = toDate ? format(new Date(toDate.toISOString()), 'yyyy-MM-dd') : '';
  const formattedFrom = fromDate ? format(new Date(fromDate.toISOString()), 'yyyy-MM-dd') : '';

  const getTranscationConfig = useApiConfig({
    url:  activeTab === 'buy' ? (fromDate && toDate ? `get-buy-transactions-history?begin_date=${formattedFrom}&end_date=${formattedTo}&per_page=10&order=desc`: `get-buy-transactions-history`) : activeTab === 'sell' ? (fromDate && toDate ? `get-sell-transactions-history?begin_date=${formattedFrom}&end_date=${formattedTo}&per_page=10&order=desc`: `get-sell-transactions-history`) : (fromDate && toDate ? `get-bills-transactions-history?begin_date=${formattedFrom}&end_date=${formattedTo}&per_page=10&order=desc`: `get-bills-transactions-history`),
    method: 'get'
  });
  
  const fetchTranscations = async () => {
    const response = await axios.request(getTranscationConfig)

    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
  
    const data = activeTab === 'buy' ?  response.data as PaginatedBuyTransactionResponse : activeTab === 'sell' ?  response.data as PaginatedSellTransactionResponse : response.data as PaginatedBillsTransactionResponse
    return data;
  };

  const { data:allTransactionData, status } = useQuery({
    queryKey: ['user-tranasctions', activeTab, fromDate && toDate ],
    queryFn: fetchTranscations,
    refetchInterval: 5000,
  });

  console.log(allTransactionData)

  const allTransactionDetails = allTransactionData?.data;

  const DateComponent = ({date, setDate, placeholder}:dateComponentProps) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className={cn("w-full lg:w-[200px] bg-white h-[45px] flex items-center justify-between px-4 rounded-md", !date && "")} onClick={() => {if (date) setDate(undefined)}}>
            { date ? format(date, 'dd/MM/yyyy') : <span>{placeholder}</span> }
            <HiOutlineCalendar className="ml-auto size-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    )
  };

  const SearchComponent = () => {
    return (
      <div className="relative w-full lg:w-[200px] h-[45px] rounded-md bg-white">
        <input type="text" className="w-full h-full px-4 rounded-md bg-inherit placeholder:text-black" placeholder="Tx ID, Type ..."/>
        <HiOutlineSearch className="size-7 absolute top-1/2 right-4 -translate-y-1/2"/>
      </div>
    )
  };

  const DesktopTransactionTable = () => {

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

    if (status === 'success' && allTransactionDetails && allTransactionDetails.length < 1) {
      return (
        <div className="w-full py-5 flex items-center justify-center text-gray-600">
          {(fromDate && toDate) ? 'You do have any transaction for the query date': 'You have made any transactions yet'}
        </div>
      )
    };

    return (
      <React.Fragment>
        {activeTab === 'buy' && 
          <Table>
            <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b-0">
              <TableRow className="bg-white hover:bg-white border-b-0 font-Inter">
                <TableHead className="text-center font-bold">Date</TableHead>
                <TableHead className="text-center font-bold">Transaction ID</TableHead>
                <TableHead className="text-center font-bold">Type</TableHead>
                <TableHead className="text-center font-bold">Coins</TableHead>
                <TableHead className="text-center font-bold">Payment Method</TableHead>
                <TableHead className="text-center font-bold">Amount</TableHead>
                <TableHead className="text-center font-bold">Coin Amount</TableHead>
                <TableHead className="text-center font-bold">Status</TableHead>
                <TableHead className="text-center font-bold">Fees</TableHead>
                <TableHead className="text-center font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTab === 'buy' && allTransactionDetails && allTransactionDetails.length > 0 && (allTransactionDetails as BuyTransaction[]).map((item) => (
                <TableRow className="border-b-0 h-[60px] even:bg-white font-Inter even:hover:bg-white odd:bg-[#f5f5f5]" key={item.id}>
                  <TableCell className="text-center">{format(new Date(item.created_at), 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-center uppercase">{item.type}</TableCell>
                  <TableCell className="text-center">{item.coin_name}</TableCell>
                  <TableCell className="text-center capitalize">{item.payment_method}</TableCell>
                  <TableCell className="text-center">NGN{item.naira_amount_to_buy?.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.coin_amount_to_buy}</TableCell>
                  <TableCell className={cn("text-center font-medium", item.payment_status === 'Pending' ? 'text-[#ff9c00]': item.payment_status === 'Completed' ? 'text-[#1faf38]': 'text-[#e41d03]')}>{item.payment_status}</TableCell>
                  <TableCell className="text-center">{item.transaction_charges} {item.coin_name}</TableCell>
                  <TableCell className="flex items-center justify-center mt-1.5">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger className="outline-none">
                        <button type="button" className="flex items-center justify-center h-full w-full">
                          <HiEllipsisVertical className="size-7"/>
                        </button>
                      </DropdownMenuTrigger>
                      { item.payment_status === 'pending' ?
                        <DropdownMenuContent className="rounded-xl">
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="rounded-lg">View</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg">Cancel</DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent> :
                        item.payment_status === 'completed' ?
                        <DropdownMenuContent className="rounded-xl">
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="rounded-lg">Save</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg">Report</DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent> :
                        ''}
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
        { activeTab === 'sell' && 
          <Table>
            <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b-0">
              <TableRow className="bg-white hover:bg-white border-b-0 font-Inter">
                <TableHead className="text-center font-bold">Date</TableHead>
                <TableHead className="text-center font-bold">Transaction ID</TableHead>
                <TableHead className="text-center font-bold">Type</TableHead>
                <TableHead className="text-center font-bold">Coins</TableHead>
                <TableHead className="text-center font-bold">Wallet Address</TableHead>
                <TableHead className="text-center font-bold">Coin Amount</TableHead>
                <TableHead className="text-center font-bold">Naira Amount</TableHead>
                <TableHead className="text-center font-bold">Status</TableHead>
                <TableHead className="text-center font-bold">Account Transferred</TableHead>
                <TableHead className="text-center font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTab === 'sell' && allTransactionDetails && allTransactionDetails.length > 0 && (allTransactionDetails as SellTransaction[]).map((item) => (
                <TableRow className="border-b-0 h-[60px] even:bg-white font-Inter even:hover:bg-white odd:bg-[#f5f5f5]" key={item.id}>
                  <TableCell className="text-center">{format(new Date(item.created_at), 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-center uppercase">{item.type}</TableCell>
                  <TableCell className="text-center">{item.coin_name}</TableCell>
                  <TableCell className="text-center capitalize">{item.wallet_address}</TableCell>
                  <TableCell className="text-center">{item.coin_amount_to_sell}{item.coin_name}</TableCell>
                  <TableCell className="text-center">{item.naira_value_to_sell}</TableCell>
                  <TableCell className={cn("text-center font-medium", item.payment_status === 'Pending' ? 'text-[#ff9c00]': item.payment_status === 'Completed' ? 'text-[#1faf38]': 'text-[#e41d03]')}>{item.payment_status}</TableCell>
                  <TableCell className="text-center">{item.bank_account_name}</TableCell>
                  <TableCell className="text-center">{item.bank_name}</TableCell>
                  <TableCell className="text-center">{item.bank_account_number}</TableCell>
                  <TableCell className="flex items-center justify-center mt-1.5">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger className="outline-none">
                        <button type="button" className="flex items-center justify-center h-full w-full">
                          <HiEllipsisVertical className="size-7"/>
                        </button>
                      </DropdownMenuTrigger>
                      { item.payment_status === 'pending' ?
                        <DropdownMenuContent className="rounded-xl">
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="rounded-lg">View</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg">Cancel</DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent> :
                        item.payment_status === 'completed' ?
                        <DropdownMenuContent className="rounded-xl">
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="rounded-lg">Save</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg">Report</DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent> :
                        ''}
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
        {activeTab === 'bills' && 
          <Table>
            <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b-0">
              <TableRow className="bg-white hover:bg-white border-b-0 font-Inter">
                <TableHead className="text-center font-bold">Date</TableHead>
                <TableHead className="text-center font-bold">Transaction ID</TableHead>
                <TableHead className="text-center font-bold">Payment Type</TableHead>
                <TableHead className="text-center font-bold">Coins</TableHead>
                <TableHead className="text-center font-bold">Bill Type</TableHead>
                <TableHead className="text-center font-bold">Coin Amount</TableHead>
                <TableHead className="text-center font-bold">Naira Amount</TableHead>
                <TableHead className="text-center font-bold">Status</TableHead>
                <TableHead className="text-center font-bold">Amount Transferred</TableHead>
                <TableHead className="text-center font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTab === 'bills' && allTransactionDetails && allTransactionDetails.length > 0 && (allTransactionDetails as BillsTransaction[]).map((item) => (
                <TableRow className="border-b-0 h-[60px] even:bg-white font-Inter even:hover:bg-white odd:bg-[#f5f5f5]" key={item.id}>
                  <TableCell className="text-center">{format(new Date(item.created_at), 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-center uppercase">{item.payment_method}</TableCell>
                  <TableCell className="text-center">{item.coin_name}</TableCell>
                  <TableCell className="text-center capitalize">{item?.bill_type}</TableCell>
                  <TableCell className="text-center">{item?.coin_amount_to_buy ? item.coin_amount_to_buy : 'N/A'}{item.coin_name}</TableCell>
                  <TableCell className="text-center">NGN{item?.naira_amount_to_buy}</TableCell>
                  <TableCell className={cn("text-center font-medium", item.payment_status === 'Pending' ? 'text-[#ff9c00]': item.payment_status === 'Completed' ? 'text-[#1faf38]': 'text-[#e41d03]')}>{item.payment_status}</TableCell>
                  <TableCell className="text-center">NGN{item?.naira_amount_transfered ? item?.naira_amount_transfered : '0.00'}</TableCell>
                  <TableCell className="flex items-center justify-center mt-1.5">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger className="outline-none">
                        <button type="button" className="flex items-center justify-center h-full w-full">
                          <HiEllipsisVertical className="size-7"/>
                        </button>
                      </DropdownMenuTrigger>
                      { item.payment_status === 'pending' ?
                        <DropdownMenuContent className="rounded-xl">
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="rounded-lg">View</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg">Cancel</DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent> :
                        item.payment_status === 'completed' ?
                        <DropdownMenuContent className="rounded-xl">
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="rounded-lg">Save</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg">Report</DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent> :
                        ''}
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </React.Fragment>
    )
  };

  const MobileTransactionItem = ({open, toggleTable, transaction}:mobileTransactionProps) => {

    return (
      <div className={cn("font-Inter w-full odd:bg-white even:bg-inherit h-[68px] md:h-[72px] overflow-hidden p-3 md:p-4 cursor-pointer transition-all duration-300", open ? 'h-auto md:h-auto': '')} onClick={toggleTable}>
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase">{transaction.type}</p>
          <p className="text-sm">NGN{transaction.naira_amount_to_buy?.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className={cn("text-center font-medium text-sm", transaction.payment_status === 'Pending' ? 'text-[#ff9c00]': transaction.payment_status === 'Completed' ? 'text-[#1faf38]': 'text-[#e41d03]')}>{transaction.payment_status}</p>
          <p className="text-sm text-black/40">{format(new Date(transaction.created_at), 'yyyy-MM-dd-HH:mm:ss')}</p>
        </div>
        <div className="border-b my-3"/>
        <div className="flex items-center justify-between">
          <p className="text-sm">Tx ID</p>
          <p className="text-sm">{transaction.id}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Coins</p>
          <p className="text-sm uppercase">{transaction.coin_name}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Payment Method</p>
          <p className="text-sm capitalize">{transaction.payment_method}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Fees</p>
          <p className="text-sm">{transaction.transaction_charges} {transaction.coin_name}</p>
        </div>
      </div>
    )
  };

  const MobileSellTransactionItem = ({open, toggleTable, transaction}:mobileSellTransactionProps) => {

    return (
      <div className={cn("font-Inter w-full odd:bg-white even:bg-inherit h-[68px] md:h-[72px] overflow-hidden p-3 md:p-4 cursor-pointer transition-all duration-300", open ? 'h-auto md:h-auto': '')} onClick={toggleTable}>
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase">{transaction.type}</p>
          <p className="text-sm">{transaction.coin_amount_to_sell}{transaction.coin_name}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className={cn("text-center font-medium text-sm", transaction.payment_status === 'Pending' ? 'text-[#ff9c00]': transaction.payment_status === 'Completed' ? 'text-[#1faf38]': 'text-[#e41d03]')}>{transaction.payment_status}</p>
          <p className="text-sm text-black/40">{format(new Date(transaction.created_at), 'yyyy-MM-dd-HH:mm:ss')}</p>
        </div>
        <div className="border-b my-3"/>
        <div className="flex items-center justify-between">
          <p className="text-sm">Tx ID</p>
          <p className="text-sm">{transaction.id}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Coins</p>
          <p className="text-sm uppercase">{transaction.coin_name}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Wallet Address</p>
          <p className="text-sm capitalize">{transaction.wallet_address}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Fees</p>
          <p className="text-sm">{transaction.bank_name} {transaction.coin_name}</p>
        </div>
      </div>
    )
  };

  const MobileBillsTransactionItem = ({open, toggleTable, transaction}:mobileBillsTransactionProps) => {

    return (
      <div className={cn("font-Inter w-full odd:bg-white even:bg-inherit h-[68px] md:h-[72px] overflow-hidden p-3 md:p-4 cursor-pointer transition-all duration-300", open ? 'h-auto md:h-auto': '')} onClick={toggleTable}>
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase">{transaction.type}</p>
          <p className="text-sm">NGN{transaction.naira_amount_to_buy}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className={cn("text-center font-medium text-sm", transaction.payment_status === 'Pending' ? 'text-[#ff9c00]': transaction.payment_status === 'Completed' ? 'text-[#1faf38]': 'text-[#e41d03]')}>{transaction.payment_status}</p>
          <p className="text-sm text-black/40">{format(new Date(transaction.created_at), 'yyyy-MM-dd-HH:mm:ss')}</p>
        </div>
        <div className="border-b my-3"/>
        <div className="flex items-center justify-between">
          <p className="text-sm">Tx ID</p>
          <p className="text-sm">{transaction.id}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Bill Type</p>
          <p className="text-sm uppercase">{transaction.bill_type}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Payment Type</p>
          <p className="text-sm capitalize">{transaction.payment_method}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Amount Transferred</p>
          <p className="text-sm">NGN{transaction?.naira_amount_transfered ? transaction?.naira_amount_transfered : '0.00'}</p>
        </div>
      </div>
    )
  };

  const MobileTransactionTable = () => {
    const [currentIndex, setCurrentIndex] = React.useState(-1);

    const toggleTranscationItem = React.useCallback((index: number) => {
      setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
    },[]);

    return (
      <React.Fragment>
        { activeTab === 'buy' && allTransactionDetails && allTransactionDetails.length > 0 && (allTransactionDetails as BuyTransaction[]).map((item: BuyTransaction, index: number) => (
          <MobileTransactionItem
            key={item.id}
            open={index === currentIndex}
            toggleTable={() => toggleTranscationItem(index)}
            transaction={item}
          />
        ))}
        {activeTab === 'sell' && allTransactionDetails && allTransactionDetails.length > 0 && (allTransactionDetails as SellTransaction[]).map((item:SellTransaction, index:number) => (
          <MobileSellTransactionItem
            key={item.id}
            open={index === currentIndex}
            toggleTable={() => toggleTranscationItem(index)}
            transaction={item}
          />
        ) )}
        {activeTab === 'bills' && allTransactionDetails && allTransactionDetails.length > 0 && (allTransactionDetails as BillsTransaction[]).map((item:BillsTransaction, index:number) => (
          <MobileBillsTransactionItem
            key={item.id}
            open={index === currentIndex}
            toggleTable={() => toggleTranscationItem(index)}
            transaction={item}
          />
        ) )}
        {activeTab === 'bills' && allTransactionDetails && allTransactionDetails.length > 0 && <div>bills</div>}
      </React.Fragment>
    )
  };

  return (
    <DashboardLayout>
      <h2 className="font-DMSans font-bold lg:text-[26px] leading-normal text-[20px]">Transaction</h2>
      <p className="font-Inter text-sm">Track, manage, and secure your trades effortlessly with a complete transaction history</p>
      <div className="w-full h-10 rounded mt-4 flex items-center gap-4 mb-4 md:mb-0">
        <button type="button" className={cn("h-full px-6 lg:px-8 border rounded-md text-sm lg:text-base", activeTab === 'buy' && 'border-primary text-white bg-primary')} onClick={() => {setActiveTab('buy'); setFromDate(undefined); setToDate(undefined); }}>Buy</button>
        <button type="button" className={cn("h-full px-6 lg:px-8 border rounded-md text-sm lg:text-base", activeTab === 'sell' && 'border-primary text-white bg-primary')} onClick={() => {setActiveTab('sell'); setFromDate(undefined); setToDate(undefined);}}>Sell</button>
        <button type="button" className={cn("h-full px-6 lg:px-8 border rounded-md text-sm lg:text-base", activeTab === 'bills' && 'border-primary text-white bg-primary')} onClick={() => {setActiveTab('bills'); setFromDate(undefined); setToDate(undefined);}}>Bills</button>
      </div>
      <div className="mt-6 hidden lg:flex items-center gap-5">
        <DateComponent date={fromDate} setDate={setFromDate} placeholder="From"/>
        <DateComponent date={toDate} setDate={setToDate} placeholder="To"/>
        <SearchComponent/>
      </div>
      <div className="mt-2 flex gap-4 flex-col lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          <DateComponent date={fromDate} setDate={setFromDate} placeholder="From"/>
          <DateComponent date={toDate} setDate={setToDate} placeholder="To"/>
        </div>
        <SearchComponent/>
      </div>
      <div className="mt-8 hidden lg:block">
        <DesktopTransactionTable/>
      </div>
      <div className="mt-4 lg:hidden">
        <MobileTransactionTable/>
      </div>
    </DashboardLayout>
  )
}

export default Transaction;