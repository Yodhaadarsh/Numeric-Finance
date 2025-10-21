import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OverviewGraph = () => {
  // Fake data for the last 6 months
  const data = [
    { month: "Apr", expenses: 2000, savings: 5000, investments: 1000 },
    { month: "May", expenses: 2500, savings: 5200, investments: 1200 },
    { month: "Jun", expenses: 2300, savings: 5400, investments: 1500 },
    { month: "Jul", expenses: 2700, savings: 5600, investments: 1300 },
    { month: "Aug", expenses: 3000, savings: 5800, investments: 1600 },
    { month: "Sep", expenses: 2800, savings: 6000, investments: 1800 },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 text-white rounded-lg p-6 shadow-lg w-full">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Financial Overview</h3>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" stroke="#cbd5e0" />
            <YAxis stroke="#cbd5e0" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "6px", color: "#fff" }}
            />
            <Legend />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="savings" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="investments" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-gray-300 text-sm">
        This chart shows your **expenses, savings, and investments** trends over the past 6 months.
      </p>
    </div>
  );
};

export default OverviewGraph;
