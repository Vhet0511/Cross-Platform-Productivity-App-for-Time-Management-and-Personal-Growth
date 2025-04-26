// src/CalendarPage.tsx
import React from 'react';
import CalendarWrapper from './CalendarWrapper';
import DateDetails from './DateDetails';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div className="calendarpage flex flex-col items-center w-full min-h-screen bg-gray-100 p-6 space-y-8">
      <CalendarWrapper
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <DateDetails selectedDate={selectedDate} />
    </div>
  );
};

export default CalendarPage;
