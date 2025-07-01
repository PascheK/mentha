"use client";

import React, { useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const UserDropdown = () => {
  const { user, logout } = useUser();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setOpen(false));

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center space-x-2 p-2 rounded transition ${
          theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
        }`}
      >
        <Image
          src={user?.photo || "/default-avatar.png"}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <ChevronDown className={`w-4 h-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`} />
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-2 w-48 border rounded shadow-lg z-50 text-sm ${
            theme === "dark"
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-white text-black border-gray-200"
          }`}
        >
          <ul
            className={`divide-y ${
              theme === "dark" ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            <li>
              <button
                className={`w-full flex items-center px-4 py-2 transition ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center px-4 py-2 transition ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={logout}
                className={`w-full flex items-center px-4 py-2 transition text-red-500 ${
                  theme === "dark" ? "hover:bg-red-900" : "hover:bg-red-50"
                }`}
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
