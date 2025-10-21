import React from "react";
import { Bell, Mail, Settings } from "lucide-react";
import { useData } from "../context/DataContext";

const Navbar = () => {

  const {user} = useData();
  // console.log(user.user.email);
  // console.log(user.name);

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-indigo-500 tracking-wide">
              NumericFinance
            </h1>
          </div>

          {/* Search Input */}
          <div className="flex-1 flex justify-center px-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md px-3 py-1 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Right Side Icons & User */}
          <div className="flex items-center space-x-4">
            
            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-gray-700 transition-all">
              <Bell className="w-5 h-5 text-gray-300 hover:text-white" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Email */}
            <button className="p-2 rounded-full hover:bg-gray-700 transition-all">
              <Mail className="w-5 h-5 text-gray-300 hover:text-white" />
            </button>

            {/* Settings */}
            <button className="p-2 rounded-full hover:bg-gray-700 transition-all">
              <Settings className="w-5 h-5 text-gray-300 hover:text-white" />
            </button>

            {/* User Profile */}
            {user ? (
              <div className="flex items-center space-x-2 cursor-pointer group">
                <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-indigo-500 transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 group-hover:scale-110">
                    {user?.name[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
