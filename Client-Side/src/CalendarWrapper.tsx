// src/CalendarWrapper.tsx
import React from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styles
import './CalendarCustom.css'; // your custom styles

interface CalendarWrapperProps {
  selectedDate: Date | Date[];
  setSelectedDate: (date: Date | Date[]) => void;
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className="p-6 w-full bg-white rounded-xl shadow-xl border border-gray-200">
      <ReactCalendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="styled-calendar"
      />
    </div>
  );
};

export default CalendarWrapper;
