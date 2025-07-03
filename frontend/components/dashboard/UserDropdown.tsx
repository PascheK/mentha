"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import UserAvatar from "../common/UserAvatar";
import DropdownMenu from "./DropdownMenu";

const UserDropdown = () => {
  const { user, logout } = useUser();

  return (
    <DropdownMenu
      className=""
      trigger={
        <>
          <UserAvatar src={user?.photo} size={40} className="border" />
          <ChevronDown className="h-4 w-4 text-text" />
        </>
      }
      items={[
        {
          id: "profile",
          element: (
            <button className="flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </button>
          ),
          className: "w-full items-center hover:bg-input-bg/80  ",
        },
        {
          id: "settings",
          element: (
            <button className="flex flex-row">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </button>
          ),
          className: "w-full items-center hover:bg-input-bg/80  ",
        },
        {
          id: "logout",
          element: (
            <button onClick={logout} className="flex flex-row">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          ),
          className: "w-full  items-center text-error hover:bg-error/10",
        },
      ]}
    />
  );
};

export default UserDropdown;
