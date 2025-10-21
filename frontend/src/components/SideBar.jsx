import React from "react";
import {
  Home,
  CreditCard,
  DollarSign,
  BarChart2,
  PieChart,
  Users,
  Zap,
  MessageCircle,
  Settings,
  User,
  Bell,
  LogOut,
  PlusCircle, // Added icon for Create Expense
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Transactions", icon: CreditCard, path: "/transactions" },
    { name: "Investments", icon: DollarSign, path: "/investments" },
    { name: "Reports", icon: BarChart2, path: "/reports" },
    { name: "Analytics", icon: PieChart, path: "/analytics" },
    { name: "Groups", icon: Users, path: "/groups" },
    { name: "AI Suggestions", icon: Zap, path: "/ai-suggestions" },
    { name: "AI Chat", icon: MessageCircle, path: "/ai-chat" },
    { name: "Create Expense", icon: PlusCircle, path: "/create/expense" }, // ✅ Added
    { name: "Notifications", icon: Bell, path: "/notifications" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Logout", icon: LogOut, path: "/logout" },
  ];

  return (
    <aside className="w-64 fixed left-0 top-14 text-white min-h-[85vh] shadow-xl">
      {/* Menu */}
      <nav className="mt-8 flex flex-col space-y-2 border-r border-gray-700 pr-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-indigo-700 shadow-lg text-white"
                    : "hover:bg-indigo-600 hover:shadow-md text-gray-200"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
