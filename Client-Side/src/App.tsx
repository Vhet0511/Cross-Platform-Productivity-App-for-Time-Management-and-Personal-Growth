
// src/pages/App.tsx
import { useState, useEffect } from 'react';
import Appbar from './Appbar.tsx';
import CalendarPage from './CalendarPage.tsx';
import NotificationPage from './NotificationPage.tsx';
import ProfilePage from './ProfilePage.tsx';
import JournalPage from './JournalPage.tsx';
import StickyNotePage from './StickyNotePage.tsx';
import AuthPage from './AuthPage.tsx'; // import the login page

// Define the User interface for better type safety
interface User {
  _id: string;
  email: string;
  name: string;
}

export default function App() {
  const [active, setActive] = useState('calendar');
  const [user, setUser] = useState<User | null>(null);

  // Load user data from sessionStorage on initial load
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  
  if (!user) {
    return <AuthPage setUser={setUser} />;
  }


  // Define the mapping for main content pages
  const pages: { [key: string]: JSX.Element } = {
    calendar: <CalendarPage />,
    notification: <NotificationPage />,
    profile: <ProfilePage />,
    sticky: <StickyNotePage />,
    journal: <JournalPage />,
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Appbar active={active} setActive={setActive} />
      <div className="flex flex-1 flex-col w-full">
        {pages[active] || <div className="p-4">Welcome!</div>}
      </div>
    </div>
  );
}

