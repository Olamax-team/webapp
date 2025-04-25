import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { cn, documentTitle } from "../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { HiOutlineCalendar, HiOutlineSearch } from "react-icons/hi";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { HiEllipsisVertical } from "react-icons/hi2";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useApiConfig } from "../hooks/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type pagiantionProps = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
}

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

type transactionDetails = {
  pagination: pagiantionProps;
  user_id: number;
  transactions: transactionProps[];
  status: string;
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

const Transaction = () => {
  documentTitle('Transaction');

  const [fromDate, setFromDate] = React.useState<Date | undefined>();
  const [toDate, setToDate] = React.useState<Date | undefined>();
  const [pendingMenu, setPendingMenu] = React.useState('view');
  const [completedMenu, setCompletedMenu] = React.useState('save');

  const getTranscationConfig = useApiConfig({
    url: 'get-transactions-history',
    method: 'get'
  });
  
  const fetchTranscations = async () => {
    const response = await axios.request(getTranscationConfig)

    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
  
    const data = response.data as transactionDetails;
    return data;
  };

  const { data:allTransactionDetails, status } = useQuery({
    queryKey: ['user-tranasctions'],
    queryFn: fetchTranscations,
  });


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
            initialFocus
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
          {allTransactionDetails && allTransactionDetails.transactions && allTransactionDetails.transactions.length > 0 &&  allTransactionDetails.transactions.map((item) => (
            <TableRow className="border-b-0 h-[60px] even:bg-white font-Inter even:hover:bg-white odd:bg-[#f5f5f5]" key={item.id}>
              <TableCell className="text-center">{format(new Date(item.created_at), 'dd/MM/yyyy')}</TableCell>
              <TableCell className="text-center">{item.id}</TableCell>
              <TableCell className="text-center uppercase">{item.type}</TableCell>
              <TableCell className="text-center">{item.coin_name}</TableCell>
              <TableCell className="text-center capitalize">{item.payment_method}</TableCell>
              <TableCell className="text-center">NGN{item.naira_value.toLocaleString()}</TableCell>
              <TableCell className={cn("text-center font-medium", item.payment_status === 'Pending' ? 'text-[#ff9c00]': item.payment_status === 'Completed' ? 'text-[#1faf38]': 'text-[#e41d03]')}>{item.payment_status}</TableCell>
              <TableCell className="text-center">{item.transaction_charges} {item.coin_name}</TableCell>
              <TableCell className="flex items-center justify-center mt-1.5">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="outline-none">
                    <button type="button" className="flex items-center justify-center h-full w-full">
                      <HiEllipsisVertical className="size-7"/>
                    </button>
                  </DropdownMenuTrigger>
                  { item.payment_status === 'Pending' ?
                    <DropdownMenuContent className="rounded-xl">
                      <DropdownMenuRadioGroup value={pendingMenu} onValueChange={setPendingMenu}>
                        <DropdownMenuRadioItem value="view" className="rounded-lg">View</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="cancel" className="rounded-lg">Cancel</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent> :
                    item.payment_status === 'Completed' ?
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

  const MobileTransactionItem = ({open, toggleTable, transaction}:mobileTransactionProps) => {

    return (
      <div className={cn("font-Inter w-full odd:bg-white even:bg-inherit h-[68px] md:h-[72px] overflow-hidden p-3 md:p-4 cursor-pointer transition-all duration-300", open ? 'h-auto md:h-auto': '')} onClick={toggleTable}>
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase">{transaction.type}</p>
          <p className="text-sm">NGN{transaction.naira_value.toLocaleString()}</p>
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
        {allTransactionDetails && allTransactionDetails.transactions && allTransactionDetails.transactions.length > 0 &&  allTransactionDetails.transactions.map((item:transactionProps, index:number) => (
          <MobileTransactionItem
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