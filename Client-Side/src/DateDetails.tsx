import React, { useEffect, useState } from 'react';

interface DateDetailsProps {
  selectedDate: Date;
}

interface ScheduleItem {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  startTime: string;
  endTime: string;
}

interface TimeLog {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  efficiency: number;
}

const DateDetails: React.FC<DateDetailsProps> = ({ selectedDate }) => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [timelogs, setTimelogs] = useState<TimeLog[]>([]);

  const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id;

  const formattedDate = selectedDate.toDateString();
// Step 1: Create a new Date object from the selected date
const adjustedDate = new Date(selectedDate);

// Step 2: Add one day to the selected date
adjustedDate.setDate(adjustedDate.getDate() + 1);

// Step 3: Get the ISO string, then split to get the date part (YYYY-MM-DD)
const dateParam = adjustedDate.toISOString().split('T')[0];
  useEffect(() => {
    if (!userId) return;

    // Fetch Schedules
    fetch(`http://localhost:3000/api/events/by-user-and-date?userId=${userId}&date=${dateParam}`)
      .then(res => res.json())
      .then(data => setSchedules(data))
      .catch(err => console.error('Error fetching schedules:', err));

    // Fetch Time Logs
    fetch(`http://localhost:3000/api/timelogs/by-user-and-date?userId=${userId}&date=${dateParam}`)
      .then(res => res.json())
      .then(data => setTimelogs(data))
      .catch(err => console.error('Error fetching timelogs:', err));
  }, [userId, dateParam]);

  const handleDeleteSchedule = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/events/${id}`, { method: 'DELETE' });
      setSchedules(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to delete schedule:', err);
    }
  };

  const handleDeleteTimelog = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/timelogs/${id}`, { method: 'DELETE' });
      setTimelogs(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to delete timelog:', err);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 space-y-10">
      
      {/* 🟣 Schedule Table */}
      <div>
        <h2 className="text-xl font-semibold text-purple-700 mb-4">📅 Plans for {formattedDate}</h2>
        <table className="w-full text-sm border border-purple-300">
          <thead className="bg-purple-100 text-purple-800">
            <tr>
              <th className="p-2">Time</th>
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Tags</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map(item => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">
                    {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                    {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-2 font-medium">{item.title}</td>
                  <td className="p-2 text-gray-600">{item.description}</td>
                  <td className="p-2">{item.tags?.join(', ') || '—'}</td>
                  <td className="p-2">
                    <button onClick={() => handleDeleteSchedule(item._id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-4 text-center text-gray-500 italic">No plans yet</td></tr>
            )}
          </tbody>
        </table>

      </div>

      {/* 🟡 Time Log Table */}
      <div>
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">📊 Tracked Activities for {formattedDate}</h2>
        <table className="w-full text-sm border border-yellow-300">
          <thead className="bg-yellow-100 text-yellow-800">
            <tr>
              <th className="p-2">Time</th>
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Efficiency (%)</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {timelogs.length > 0 ? (
              timelogs.map(log => (
                <tr key={log._id} className="border-t">
                  <td className="p-2">
                    {new Date(log.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                    {new Date(log.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-2 font-medium">{log.title}</td>
                  <td className="p-2 text-gray-600">{log.description}</td>
                  <td className="p-2">{log.efficiency}%</td>
                  <td className="p-2">
                    <button onClick={() => handleDeleteTimelog(log._id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-4 text-center text-gray-500 italic">Nothing logged yet</td></tr>
            )}
          </tbody>
        </table>
   
      </div>
    </div>
  );
};

export default DateDetails;
