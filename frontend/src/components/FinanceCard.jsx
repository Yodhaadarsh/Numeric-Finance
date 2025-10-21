import React, { useState } from "react";
import { Plus, Edit, ArrowUp, ArrowDown, DollarSign, CreditCard, PieChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Generic Card Component
const FinanceCard = ({ title, icon: Icon, initialData }) => {
  const [monthlyData, setMonthlyData] = useState(initialData);

  const value = monthlyData[monthlyData.length - 1].amount;
  const lastMonthValue = monthlyData[monthlyData.length - 2]?.amount || value;
  const difference = value - lastMonthValue;
  const isPositive = difference >= 0;
  const formattedDifference = Math.abs(difference).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleAddNew = () => {
    const newMonth = `Month${monthlyData.length + 1}`;
    const newAmount = value + Math.floor(Math.random() * 500 - 200);
    setMonthlyData([...monthlyData, { month: newMonth, amount: newAmount }]);
  };

  const handleUpdate = () => {
    const updatedData = monthlyData.map((item, idx) =>
      idx === monthlyData.length - 1
        ? { ...item, amount: item.amount + Math.floor(Math.random() * 300 - 150) }
        : item
    );
    setMonthlyData(updatedData);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 text-white rounded-lg p-5 shadow-lg w-full max-w-sm">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>

      {/* Value & Trend */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-2xl font-bold">
          {value.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </span>
        <span className={`flex items-center text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
          {formattedDifference} {isPositive ? "up" : "down"} from last month
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 text-gray-300 text-sm">
        {title} trend over the past months.
      </p>

      {/* Graph */}
      <div className="mt-4 w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <XAxis dataKey="month" stroke="#cbd5e0" />
            <YAxis stroke="#cbd5e0" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "6px", color: "#fff" }}
            />
            <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
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

// Dashboard Example
const FinanceDashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <FinanceCard
        title="Total Expenses"
        icon={CreditCard}
        initialData={[
          { month: "Apr", amount: 2000 },
          { month: "May", amount: 2500 },
          { month: "Jun", amount: 2300 },
          { month: "Jul", amount: 2700 },
          { month: "Aug", amount: 3000 },
        ]}
      />
      <FinanceCard
        title="Total Savings"
        icon={DollarSign}
        initialData={[
          { month: "Apr", amount: 5000 },
          { month: "May", amount: 5200 },
          { month: "Jun", amount: 5400 },
          { month: "Jul", amount: 5600 },
          { month: "Aug", amount: 5800 },
        ]}
      />
      <FinanceCard
        title="Where You Want to Invest"
        icon={PieChart}
        initialData={[
          { month: "Apr", amount: 1000 },
          { month: "May", amount: 1200 },
          { month: "Jun", amount: 1500 },
          { month: "Jul", amount: 1300 },
          { month: "Aug", amount: 1600 },
        ]}
      />
    </div>
  );
};

export default FinanceDashboard;
