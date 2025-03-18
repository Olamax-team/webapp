import React, { useState, useRef, useEffect } from 'react';

interface CalendarComponentProps {
  // Add any props your component might need
}

const NewCalendarComponent: React.FC<CalendarComponentProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleTriggerClick = (): void => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <button ref={triggerRef} onClick={handleTriggerClick}>
        {selectedDate ? formatDate(selectedDate) : 'Select Date'}
      </button>

      {isOpen && (
        <div
          ref={calendarRef}
          style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            zIndex: 1000,
          }}
        >
          <input
            type="date"
            value={formatDate(selectedDate)}
            onChange={handleDateChange}
          />
        </div>
      )}
    </div>
  );
};

export default NewCalendarComponent;