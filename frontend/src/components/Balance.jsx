import React, { useState } from "react";
import { ArrowUp, ArrowDown, Plus, Edit } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AccountBalanceDashboard = () => {
  // Fake data
  const [monthlyData, setMonthlyData] = useState([
    { month: "Apr", balance: 5000 },
    { month: "May", balance: 5200 },
    { month: "Jun", balance: 5100 },
    { month: "Jul", balance: 5400 },
    { month: "Aug", balance: 5600 },
    { month: "Sep", balance: 5800 },
  ]);

  const balance = monthlyData[monthlyData.length - 1].balance;
  const lastMonthBalance = monthlyData[monthlyData.length - 2].balance;
  const difference = balance - lastMonthBalance;
  const isPositive = difference >= 0;
  const formattedDifference = Math.abs(difference).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Handlers for fake add/update
  const handleAddNew = () => {
    const newMonth = `Month${monthlyData.length + 1}`;
    const newBalance = balance + Math.floor(Math.random() * 500);
    setMonthlyData([...monthlyData, { month: newMonth, balance: newBalance }]);
  };

  const handleUpdate = () => {
    const updatedData = monthlyData.map((item, idx) =>
      idx === monthlyData.length - 1
        ? { ...item, balance: item.balance + Math.floor(Math.random() * 300 - 150) }
        : item
    );
    setMonthlyData(updatedData);
  };

  return (
    <div className="btext-white rounded-xl  p-6 shadow-lg shadow-slate-800   ">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-300">Account Balance</h3>

      {/* Balance & Trend */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-3xl font-bold">
          {balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </span>
        <span
          className={`flex items-center text-sm font-medium ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
          {formattedDifference} {isPositive ? "up" : "down"} from last month
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 text-gray-300 text-sm">
        Your financial summary shows the comparison with last month's account balance.
      </p>

      {/* Graph */}
      <div className="mt-4 w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <XAxis dataKey="month" stroke="#cbd5e0" />
            <YAxis stroke="#cbd5e0" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex space-x-3">
        <button
          onClick={handleAddNew}
          className="flex items-center bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md shadow text-white text-sm font-semibold transition-all"
        >
          <Plus className="w-4 h-4 mr-1" /> Add New
        </button>

        <button
          onClick={handleUpdate}
          className="flex items-center bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md shadow text-white text-sm font-semibold transition-all"
        >
          <Edit className="w-4 h-4 mr-1" /> Update
        </button>
      </div>
    </div>
  );
};

export default AccountBalanceDashboard;
