// src/pages/StickyNoteView.tsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function StickyNoteView() {
  // State to hold sticky notes data
  const [stickyNotes, setStickyNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user ID from the session
    const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?._id; // Extract userId

    // Fetch sticky notes from API
    axios
      .get(`http://localhost:3000/api/stickies/user/${userId}`)
      .then((response) => {
        setStickyNotes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load sticky notes");
        setLoading(false);
      });
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading sticky notes...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  const handleDelete = (id: string) => {
    // Confirm before deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this sticky note?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/api/stickies/${id}`)
        .then((response) => {
          // After successful deletion, remove the note from the state
          setStickyNotes(stickyNotes.filter(note => note._id !== id));
          alert("Sticky note deleted successfully!");
        })
        .catch((err) => {
          setError("Failed to delete sticky note");
        });
    }
  };

  return (
<div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-center mb-6">📝 Sticky Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {stickyNotes.map((note) => (
          <div
            key={note._id}
            className="w-full max-w-xs bg-[#B24BF3] p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            {/* Edit and Delete Buttons */}
            <div className="flex justify-between items-center mb-4">
           
              <button
                onClick={() => handleDelete(note._id)}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 ml-auto rounded-full transition-all duration-300"
              >
                🗑️ Delete
              </button>
            </div>

            {/* Sticky Note Content */}
            <h2 className="font-serif text-2xl text-white mb-2">{note.title}</h2>
            <p className="text-white mb-4">{note.description}</p>
            
            {/* Display Reminders */}
            <div className="text-white text-xs space-y-1">
              {note.reminders.map((reminder: any) => (
                <div key={reminder._id}>
                  <p className="text-gray-200">
                    📅 Reminder: {new Date(reminder.startTime).toLocaleString()} -{" "}
                    {new Date(reminder.endTime).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
