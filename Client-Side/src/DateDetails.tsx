// src/DateDetails.tsx
import React from 'react';

interface DateDetailsProps {
  selectedDate: Date;
}

const DateDetails: React.FC<DateDetailsProps> = ({ selectedDate }) => {
  const formattedDate = selectedDate.toDateString();

  return (
    <div className="w-full  mx-auto bg-white rounded-lg shadow-lg p-6 space-y-8 border border-gray-200">
      {/* Schedule Table */}
      <div>
        <h2 className="text-xl font-semibold text-purple-700 mb-4">📅 Schedule of {formattedDate}</h2>
        <table className="w-full text-sm text-left border border-purple-300 rounded-lg overflow-hidden">
          <thead className="bg-purple-100 text-purple-800">
            <tr>
              <th className="p-2">Time</th>
              <th className="p-2">Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">—</td>
              <td className="p-2 italic text-gray-500">No plans yet</td>
            </tr>
          </tbody>
        </table>
        <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          ➕ Add Plan
        </button>
      </div>

      {/* Track Table */}
      <div>
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">📊 Track of {formattedDate}</h2>
        <table className="w-full text-sm text-left border border-yellow-300 rounded-lg overflow-hidden">
          <thead className="bg-yellow-100 text-yellow-800">
            <tr>
              <th className="p-2">Activity</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">—</td>
              <td className="p-2 italic text-gray-500">Nothing logged yet</td>
            </tr>
          </tbody>
        </table>
        <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
          📝 Add Log
        </button>
      </div>
    </div>
  );
};

export default DateDetails;
