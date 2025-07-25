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

type transactionProps = {
  id: number;
  user_id: number;
  created_at: string;
  ref: string;
  coin_id: string;
  coin_name: string;
  payment_method: string;
  naira_value: number;
  payment_status: string;
  transaction_charges: string;
  type: string;
};


type dateComponentProps = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  placeholder: string;
};

type mobileTransactionProps = {
  open: boolean;
  toggleTable: () => void;
  transaction: transactionProps
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
}



const Transaction = () => {
  documentTitle('Transaction');

  const [fromDate, setFromDate] = React.useState<Date | undefined>();
  const [toDate, setToDate] = React.useState<Date | undefined>();

  const formattedTo = toDate ? format(new Date(toDate.toISOString()), 'yyyy-MM-dd') : '';
  const formattedFrom = fromDate ? format(new Date(fromDate.toISOString()), 'yyyy-MM-dd') : '';

  const getTranscationConfig = useApiConfig({
    url: fromDate && toDate ? `get-buy-transactions-history?begin_date=${formattedFrom}&end_date=${formattedTo}&per_page=10&order=desc`: `get-buy-transactions-history`,
    method: 'get'
  });
  
  const fetchTranscations = async () => {
    const response = await axios.request(getTranscationConfig)

    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
  
    const data = response.data as PaginatedBuyTransactionResponse;
    return data;
  };

  const { data:allTransactionData, status } = useQuery({
    queryKey: ['user-tranasctions', fromDate && toDate ],
    queryFn: fetchTranscations,
    refetchInterval: 5000,
  });

  const allTransactionDetails = (fromDate && toDate) ? allTransactionData?.data :  allTransactionData?.data;

  console.table(allTransactionDetails);

  const DateComponent = ({date, setDate, placeholder}:dateComponentProps) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className={cn("w-full lg:w-[200px] bg-white h-[45px] flex items-center justify-between px-4 rounded-md", !date && "")}>
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
          { allTransactionDetails && allTransactionDetails.length > 0 && allTransactionDetails.map((item) => (
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
    )
  };

  const MobileTransactionItem = ({open, toggleTable, transaction}:mobileTransactionProps) => {

    return (
      <div className={cn("font-Inter w-full odd:bg-white even:bg-inherit h-[68px] md:h-[72px] overflow-hidden p-3 md:p-4 cursor-pointer transition-all duration-300", open ? 'h-auto md:h-auto': '')} onClick={toggleTable}>
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase">{transaction.type}</p>
          <p className="text-sm">NGN{transaction.naira_value?.toLocaleString()}</p>
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

  const MobileTransactionTable = () => {
    const [currentIndex, setCurrentIndex] = React.useState(-1);

    const toggleTranscationItem = React.useCallback((index: number) => {
      setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
    },[]);

    return (
      <React.Fragment>
        {allTransactionDetails && allTransactionDetails.length > 0 && allTransactionDetails.map((item: BuyTransaction, index: number) => {
          const transactionPropsObj: transactionProps = {
            ...item,
            user_id: 0, // Replace with actual user_id if available
            naira_value: item.naira_amount_to_buy,
            transaction_charges: item.transaction_charges !== null ? item.transaction_charges.toString() : "0"
          };
          return (
            <MobileTransactionItem
              key={index}
              open={index === currentIndex}
              toggleTable={() => toggleTranscationItem(index)}
              transaction={transactionPropsObj}
            />
          );
        })}
      </React.Fragment>
    )
  };

  return (
    <DashboardLayout>
      <h2 className="font-DMSans font-bold lg:text-[26px] leading-normal text-[20px]">Transaction</h2>
      <p className="font-Inter text-sm">Track, manage, and secure your trades effortlessly with a complete transaction history</p>
      <div className="mt-6 hidden lg:flex items-center gap-5">
        <DateComponent date={fromDate} setDate={setFromDate} placeholder="From"/>
        <DateComponent date={toDate} setDate={setToDate} placeholder="To"/>
        <SearchComponent/>
      </div>
      <div className="mt-4 flex gap-4 flex-col lg:hidden">
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