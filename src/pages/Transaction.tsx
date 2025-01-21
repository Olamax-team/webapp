import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { cn, documentTitle } from "../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { HiOutlineCalendar } from "react-icons/hi";
import { Calendar } from "../components/ui/calendar";

const Transaction = () => {
  documentTitle('Transaction');

  const [date, setDate] = React.useState<Date | undefined>()

  const DateComponent = () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className={cn("w-[200px] border h-[45px] flex items-center justify-between px-4 rounded-md", !date && "")}>
            { date ? date.toDateString() : <span>From</span> }
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
  }

  return (
    <DashboardLayout>
      <div className="px-20 py-8">
        <h2 className="font-DMSans font-bold text-[26px] leading-normal">Transaction</h2>
        <p className="font-Inter text-sm">Track, manage, and secure your trades effortlessly with a complete transaction history</p>
        <DateComponent/>
      </div>
    </DashboardLayout>
  )
}

export default Transaction;