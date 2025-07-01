"use client";

import React, { useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useOutsideClick } from "@/hooks/useOutsideClick";
 
const notificationsMock = [
  { id: 1, message: "New comment on your site", read: false },
  { id: 2, message: "Subscription expiring soon", read: true },
];

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
 const dropdownRef = useRef<HTMLDivElement>(null);
 useOutsideClick(dropdownRef, () => setOpen(false));
  const unreadCount = notificationsMock.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`relative p-2 rounded transition duration-200 ease-in-out ${
          theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
        }`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
      >
        <Bell className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-gray-700"}`} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 rounded-full bg-red-500" />
        )}
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-2 w-64 border rounded shadow-lg z-50 animate-slide-down ${
            theme === "dark"
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-white text-black border-gray-200"
          }`}
        >
          <div
            className={`p-4 text-sm font-medium border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            Notifications
          </div>
          <ul
            className={`max-h-60 overflow-y-auto divide-y ${
              theme === "dark" ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            {notificationsMock.length === 0 ? (
              <li className="p-4 text-gray-500">No notifications</li>
            ) : (
              notificationsMock.map((notif) => (
                <li
                  key={notif.id}
                  className={`p-4 text-sm ${
                    notif.read
                      ? theme === "dark"
                        ? "text-gray-500"
                        : "text-gray-500"
                      : theme === "dark"
                      ? "text-white"
                      : "text-black"
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
