import React from "react";
import { Calendar, Download } from "lucide-react";
import { useData } from "../context/DataContext";

const Banner = () => {
  const user = useData();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });


  // console.log(user.user);

  return (
    <div className=" text-white rounded-lg p-6 shadow-lg shadow-gray-900 flex flex-col md:flex-row justify-between items-start md:items-center">
      {/* Left Side: Welcome & Description */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">
          Welcome, {user?.user?.name || "User"}!
        </h2>
        <p className="text-gray-300 text-sm md:text-base">
          Here’s a quick overview of your finances and latest insights for
          today.
        </p>
      </div>

      {/* Right Side: Today & Export */}
      <div className="flex space-x-4 mt-4 md:mt-0 items-center">
        {/* Today */}
        <div className="flex items-center bg-gray-800 px-3 py-2 rounded-md shadow hover:bg-gray-700 transition-all">
          <Calendar className="w-5 h-5 text-indigo-400 mr-2" />
          <span className="text-sm">{today}</span>
        </div>

        {/* Export Button */}
        <button className="flex items-center bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded-md shadow transition-all text-white text-sm">
          <Download className="w-5 h-5 mr-2" />
          Export
        </button>
      </div>
    </div>
  );
};

export default Banner;
