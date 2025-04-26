import { useState } from 'react';
import Appbar from './Appbar.tsx';
import CalendarPage from './CalendarPage.tsx';
import NotificationPage from './NotificationPage.tsx';
import ProfilePage from './ProfilePage.tsx';
import JournalPage from './JournalPage.tsx';
import StickyNotePage from './StickyNotePage.tsx';


export default function App() {
  const [active, setActive] = useState('calendar');

  const mainContent = () => {
    switch (active) {
      case 'calendar':
        return <CalendarPage />;
      case 'notification':
        return <NotificationPage />;
      case 'profile':
        return <ProfilePage />;
      case 'sticky' :
        return <StickyNotePage />;
      case 'journal':
        return <JournalPage />;
      default:
        return <div className="p-4">Welcome!</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Appbar active={active} setActive={setActive} />
      <div className="flex flex-1 flex-col w-full">{mainContent()}</div>
    </div>
  );
}