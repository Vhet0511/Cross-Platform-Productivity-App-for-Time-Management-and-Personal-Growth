import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import calendarlogo from './assets/calendar logo.png';
import journallogo from './assets/journal logo.png';
import stickynoteslogo from './assets/stickynotes logo.png';
import profilephoto from './assets/profile.png';
import notificationbell from './assets/notification bell.png';

function Appbar({ active, setActive }) {

  const menuItems = [
    { id: 'profile', src: profilephoto, extraClass: 'rounded-full', alt: 'profile' },
    { id: 'notification', src: notificationbell, alt: 'notification' },
    { id: 'sticky', src: stickynoteslogo, alt: 'sticky' },
    { id: 'journal', src: journallogo, alt: 'journal' },
    { id: 'calendar', src: calendarlogo, alt: 'calendar' }
  ];

  return (
    <div className="app-bar flex bg-primary w-screen h-16 pt-3 pl-3 sm:h-24 sm:pl-2 sm:pt-6 md:h-28 md:pl-4 md:pt-6 lg:h-32 lg:pl-6 lg:pt-6">
      
      <div className="logo-homepage w-20 h-10 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-40 lg:h-20"> 
        <img src={logo} alt="Logo" className="w-full h-full" />
      </div>

      <div className="link-menu flex justify-around flex-row-reverse w-50 sm:w-72 md:w-80 lg:w-100 p-2 sm:p-3 lg:p-5 md:p-5 ml-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`
              relative m-1 aspect-square w-8 sm:w-10 md:w-12 lg:w-14 
              flex items-center justify-center cursor-pointer group
              after:content-[''] after:w-2 after:h-2 after:rounded-full after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2
              ${active === item.id ? 'after:bg-white' : 'after:bg-transparent'}
              hover:after:bg-amber-100
            `}
          >
            <img
              src={item.src}
              alt="item.alt"
              className={`w-full h-full aspect-square ${item.extraClass || ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appbar;
