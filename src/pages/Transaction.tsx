import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { documentTitle } from "../lib/utils";

const Transaction = () => {
  documentTitle('Transaction');

  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
    console.log('i clicked it')
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <DashboardLayout>
      <div className="px-20 py-8">
        <h2 className="font-DMSans font-bold text-[26px] leading-normal">Transaction</h2>
        <p className="font-Inter text-sm">Track, manage, and secure your trades effortlessly with a complete transaction history</p>
        <div className="flex">
          <button onClick={() => handleButtonClick} className="border px-6 py-2">Select Date</button>
          <input
            type="date"
            ref={inputRef}
            value={selectedDate || ''}
            onChange={handleDateChange}
            style={{ display: 'none' }} // Hide the input element
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Transaction;