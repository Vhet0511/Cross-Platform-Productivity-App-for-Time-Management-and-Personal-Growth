import React, { useState } from 'react';

const AddLog = () => {
  // Fetching user from sessionStorage
  const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id || '';

  const [newLog, setNewLog] = useState({
    title: '',
    description: '',
    tag: '', // Tag field added to state
    startTime: '',
    endTime: '',
    efficiency: 0,
    userId: userId,  // Automatically includes userId
  });

  const [isVisible, setIsVisible] = useState(true);  // State for form visibility

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewLog((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/timelogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLog),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Log Added:', data);
        setNewLog({
          title: '',
          description: '',
          tag: '',
          startTime: '',
          endTime: '',
          efficiency: 0,
          userId: userId,  // Reset with the current userId
        });
      })
      .catch((err) => console.error('Error adding log:', err));
  };

  return (
    <div className="flex-col p-10 max-w-3xl mx-auto space-y-10">
      <button
        onClick={() => setIsVisible((prev) => !prev)}  // Toggle form visibility
        className="w-full py-4  rounded-lg text-xl font-semibold tracking-wide"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
        }}
      >
        {isVisible ? 'Hide Form' : 'Add a New Time Log'}  {/* Button text toggle */}
      </button>

      {isVisible && (
        <form
          onSubmit={handleSubmit}
          className="flex-col p-10 max-w-3xl mx-auto space-y-10 "
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
            Add a New Time Log
          </h2>

          <div className="space-y-6">
            {[
              { label: 'Title', id: 'title', type: 'text' },
              { label: 'Description', id: 'description', isTextArea: true },
              { label: 'Tag', id: 'tag', type: 'text' },  // Tag field
              { label: 'Start Time', id: 'startTime', type: 'datetime-local' },
              { label: 'End Time', id: 'endTime', type: 'datetime-local' },
              { label: 'Efficiency (%)', id: 'efficiency', type: 'number' },
            ].map(({ label, id, type, isTextArea }) => (
              <div key={id} className="space-y-2">
                <label htmlFor={id} className="block text-lg font-semibold">
                  {label}
                </label>
                {isTextArea ? (
                  <textarea
                    id={id}
                    name={id}
                    value={newLog[id]}
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
                    value={newLog[id]}
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
              className="w-full py-4  rounded-lg text-xl font-semibold tracking-wide"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
              }}
            >
              Save Log
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddLog;
