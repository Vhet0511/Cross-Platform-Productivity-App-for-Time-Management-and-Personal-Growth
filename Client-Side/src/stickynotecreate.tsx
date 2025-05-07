import React, { useState } from 'react';

type Reminder = {
  startTime: string;
  endTime: string;
};

export default function StickyNoteCreate() {
  // States for the sticky note fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [reminders, setReminders] = useState<Reminder[]>([{ startTime: '', endTime: '' }]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // User ID from sessionStorage (assuming the user is logged in and their ID is stored there)
  const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id; // Extract userId

  // Add a new reminder to the array
  const handleAddReminder = () => {
    setReminders([...reminders, { startTime: '', endTime: '' }]);
  };

  // Remove a reminder from the array
  const handleRemoveReminder = (index: number) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  // Update a specific reminder's field (startTime or endTime)
  const handleReminderChange = (index: number, field: keyof Reminder, value: string) => {
    const updatedReminders = [...reminders];
    updatedReminders[index][field] = value;
    setReminders(updatedReminders);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Make sure the userId exists
    if (!userId) {
      alert('User not logged in!');
      return;
    }

    // Create the note data object to send to the API
    const noteData = {
      userId,
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()), // Convert tags to array
      mark: 'active',
      reminders,
    };

    try {
      const res = await fetch('http://localhost:3000/api/stickies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Note creation failed', data);
      } else {
        console.log('Note created!', data);
        // Optionally, reset form or navigate after successful creation
      }
    } catch (error) {
      console.error('An error occurred while creating the sticky note:', error);
    }
    setIsFormVisible(false);
    // Refresh the page
    window.location.reload();
    
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* Button to toggle form visibility */}
      <button
        className="w-full bg-blue-600 text-white p-2 rounded-md mb-4 hover:bg-blue-700 transition"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? '📅 Hide Form' : '📝 Create Sticky Note'}
      </button>

      {/* Form visible only when 'isFormVisible' is true */}
      {isFormVisible && (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 border border-gray-200">
          {/* Sticky Note Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Title Field */}
            <div className="mb-4">
              <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="noteTitle"
                className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label htmlFor="noteDescription" className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                id="noteDescription"
                className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter note description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Tags Field */}
            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                id="tags"
                className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Reminders Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Reminders</label>

              {/* Render each reminder input */}
              {reminders.map((reminder, index) => (
                <div key={index} className="flex items-center space-x-4 mb-2">
                  {/* Start Time Input */}
                  <input
                    type="datetime-local"
                    className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={reminder.startTime}
                    onChange={(e) => handleReminderChange(index, 'startTime', e.target.value)}
                  />
                  {/* End Time Input */}
                  <input
                    type="datetime-local"
                    className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={reminder.endTime}
                    onChange={(e) => handleReminderChange(index, 'endTime', e.target.value)}
                  />
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveReminder(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️ Remove
                  </button>
                </div>
              ))}

              {/* Add Reminder Button */}
              <button
                type="button"
                onClick={handleAddReminder}
                className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
              >
                ➕ Add Reminder
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              ➕ Add Note
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
