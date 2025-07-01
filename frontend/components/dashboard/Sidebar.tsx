// components/dashboard/Sidebar.tsx
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn"; // utilitaire de merge de classes conditionnelles

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items?: NavItem[];
  collapsed?: boolean;
}

const defaultItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "Subscription", href: "/dashboard/subscription" },
  { label: "Sites", href: "/dashboard/sites" },
];

const Sidebar: React.FC<SidebarProps> = ({ items = defaultItems, collapsed = false }) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-screen w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hidden md:block",
        collapsed && "w-20"
      )}
    >
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 p-2 rounded-md font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800",
              pathname === item.href &&
                "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
            )}
          >
            {item.icon && <span className="text-xl">{item.icon}</span>}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
