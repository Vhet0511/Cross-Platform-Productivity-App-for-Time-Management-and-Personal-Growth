// src/CalendarPage.tsx
import React from 'react';
import CalendarWrapper from './CalendarWrapper';
import DateDetails from './DateDetails';
import AddLog from './AddLog';
import AddEvent from './AddEvent';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div className="calendarpage flex flex-col items-center w-full min-h-screen bg-gray-100 p-6 space-y-8">
      <CalendarWrapper
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <DateDetails selectedDate={selectedDate} />
            <div className="w-full flex flex-row">
              <div className="w-full">
            <AddLog />
            </div>
            <div className="w-full">
            <AddEvent />
            </div>
          </div>
    </div>
  );
};

export default CalendarPage;
