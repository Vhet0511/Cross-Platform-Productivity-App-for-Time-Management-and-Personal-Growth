import React, { useState } from 'react';

const AddEvent = () => {
  // Retrieve user information from sessionStorage
  const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id || '';

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    tags: '',
    startTime: '',
    endTime: '',
    userId: userId,
  });

  const [isVisible, setIsVisible] = useState(true); // State for visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data with tags as an array
    const eventData = {
      ...newEvent,
      tags: newEvent.tags.split(',').map((tag) => tag.trim()),
    };

    fetch('http://localhost:3000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Event Added:', data);
        setNewEvent({
          title: '',
          description: '',
          tags: '',
          startTime: '',
          endTime: '',
          userId: userId,
        });
      })
      .catch((err) => console.error('Error adding event:', err));
  };

  return (
    <div className="">
      {/* Button to toggle form visibility */}
      <button
        onClick={() => setIsVisible((prev) => !prev)} // Toggle visibility state
        className="w-full py-4 mt-6 rounded-lg text-xl font-semibold tracking-wide"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
        }}
      >
        {isVisible ? 'Hide Form' : 'Add a New Event'} {/* Button text toggle */}
      </button>

      {/* Conditional rendering of the form */}
      {isVisible && (
        <form
          onSubmit={handleSubmit}
          className="flex-col p-10 max-w-3xl mx-auto space-y-10"
          style={{
            fontFamily: `'Poppins', sans-serif`,
            backgroundColor: 'var(--color-tertiary)',
            color: 'var(--color-secondary)',
          }}
        >
          <h2
            className="text-4xl font-bold text-center tracking-wide"
            style={{ color: 'var(--color-primary)' }}
          >
            Add a New Event
          </h2>

          <div className="space-y-6">
            {[
              { label: 'Title', id: 'title', type: 'text' },
              { label: 'Description', id: 'description', isTextArea: true },
              { label: 'Tags (comma-separated)', id: 'tags', type: 'text' },
              { label: 'Start Time', id: 'startTime', type: 'datetime-local' },
              { label: 'End Time', id: 'endTime', type: 'datetime-local' },
            ].map(({ label, id, type, isTextArea }) => (
              <div key={id} className="space-y-2">
                <label htmlFor={id} className="block text-lg font-semibold">
                  {label}
                </label>
                {isTextArea ? (
                  <textarea
                    id={id}
                    name={id}
                    value={newEvent[id]}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    rows={4}
                    style={{ backgroundColor: 'white' }}
                  />
                ) : (
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={newEvent[id]}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    style={{ backgroundColor: 'white' }}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-4 mt-6 rounded-lg text-xl font-semibold tracking-wide"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
              }}
            >
              Save Event
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddEvent;
