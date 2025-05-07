// src/pages/ProfilePage.tsx
import { useState, useEffect } from 'react';
import profilephoto from './assets/profile.jpg';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  // Load user data from sessionStorage on initial load
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); // Set the user info from sessionStorage
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading while user data is being fetched
  }

  // Log out the user by removing sessionStorage and redirecting
  const handleLogOut = () => {
    sessionStorage.removeItem('user'); // Remove user from sessionStorage
    setUser(null); // Set user state to null
    window.location.href = '/login'; // Redirect to login page (replace with your actual login route)
  };

  return (
    <div className="p-6 flex-row w-full mx-auto">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
          <img
            src={profilephoto} // You can replace this with a user-specific photo if available
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2> {/* Display user's name */}
          <p className="text-gray-500 text-sm">{user.email}</p> {/* Display user's email */}
        </div>
      </div>

      {/* Options List */}
      <div className="bg-white rounded-xl shadow divide-y">
        <OptionItem title="🛠️ Edit Profile" />
        <div onClick={handleLogOut} className="p-4 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium">
          🚪 Log Out
        </div>
      </div>
    </div>
  );
}

// Helper component for each profile option
function OptionItem({ title }: { title: string }) {
  return (
    <div className="p-4 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium">
      {title}
    </div>
  );
}
