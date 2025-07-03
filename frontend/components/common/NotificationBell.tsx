"use client";

import { Bell } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

const notificationsMock = [
  { id: 1, message: "New comment on your site", read: false },
  { id: 2, message: "Subscription expiring soon", read: true },
  { id: 23, message: "Subscription expiring soon", read: true },
  { id: 24, message: "Subscription expiring soon", read: true },
  { id: 25, message: "Subscription expiring soon", read: true },
  { id: 26, message: "Subscription expiring soon", read: true },
  { id: 27, message: "Subscription expiring soon", read: true },
  { id: 28, message: "Subscription expiring soon", read: true },
  { id: 29, message: "Subscription expiring soon", read: true },
  { id: 20, message: "Subscription expiring soon", read: true },
];

const NotificationBell = () => {
  const unreadCount = notificationsMock.filter((n) => !n.read).length;

  return (
    <DropdownMenu
      trigger={
        <div className="relative rounded p-2 transition duration-200 ease-in-out hover:bg-input-bg/80">
          <Bell className="h-6 w-6 text-text" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-error" />
          )}
        </div>
      }
      items={[
        {
          id: "header",
          element: (
            <div className="border-b border-border p-4 text-sm font-medium">
              Notifications
            </div>
          ),
        },
        ...(notificationsMock.length === 0
          ? [
              {
                id: "none",
                element: (
                  <div className="p-4 text-sm text-placeholder">
                    No notifications
                  </div>
                ),
              },
            ]
          : [
              {
                id: "list",
                className: "max-h-60 overflow-y-auto",
                element: (
                  <ul className=" ">
                    {notificationsMock.map((notification) => (
                      <li
                        key={notification.id}
                        className={`px-4 py-2 text-sm ${
                          notification.read ? "text-text" : "font-medium"
                        }`}
                      >
                        {notification.message}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]),
      ]}
    />
  );
};

export default NotificationBell;
