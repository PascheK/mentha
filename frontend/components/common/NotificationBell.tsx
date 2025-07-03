"use client";

import React, { useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
 
const notificationsMock = [
  { id: 1, message: "New comment on your site", read: false },
  { id: 2, message: "Subscription expiring soon", read: true },
];

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 200);
  };

  useOutsideClick(dropdownRef, () => {
    if (open) closeDropdown();
  });
  const unreadCount = notificationsMock.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 rounded transition duration-200 ease-in-out hover:bg-input-bg/80"
        onClick={() => {
          if (open) {
            closeDropdown();
          } else {
            setOpen(true);
          }
        }}
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-text" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 rounded-full bg-error" />
        )}
      </button>

      {(open || closing) && (
        <div
          className={`absolute right-0 mt-2 w-64 border rounded shadow-lg z-50 ${
            closing ? "animate-slide-up" : "animate-slide-down"
          } bg-bg text-text border-border`}
        >
          <div
            className="p-4 text-sm font-medium border-b border-border"
          >
            Notifications
          </div>
          <ul
            className="max-h-60 overflow-y-auto divide-y divide-color-border"
          >
            {notificationsMock.length === 0 ? (
              <li className="p-4 text-placeholder">No notifications</li>
            ) : (
              notificationsMock.map((notif) => (
                <li
                  key={notif.id}
                  className={`p-4 text-sm ${
                    notif.read ? "text-placeholder" : "text-text"
                  }`}
                >
                  {notif.message}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
