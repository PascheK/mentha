"use client";

import React, { useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import UserAvatar from "../common/UserAvatar";

const UserDropdown = () => {
  const { user, logout } = useUser();
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

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => {
          if (open) {
            closeDropdown();
          } else {
            setOpen(true);
          }
        }}
        className="flex items-center space-x-2 p-2 rounded transition duration-200 ease-in-out hover:bg-color-input-bg/80"
      >
        <UserAvatar src={user?.photo} size={32} className="border" />
        <ChevronDown className="w-4 h-4 text-color-text" />
      </button>

      {(open || closing) && (
        <div
          className={`absolute right-0 mt-2 w-48 border rounded shadow-lg z-50 text-sm ${
            closing ? "animate-slide-up" : "animate-slide-down"
          } bg-color-bg text-color-text border-color-border`}
        >
          <ul
            className="divide-y divide-color-border"
          >
            <li>
              <button
                className="w-full flex items-center px-4 py-2 transition duration-200 ease-in-out hover:bg-color-input-bg/80"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center px-4 py-2 transition duration-200 ease-in-out hover:bg-color-input-bg/80"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2 transition duration-200 ease-in-out text-color-error hover:bg-color-error/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
