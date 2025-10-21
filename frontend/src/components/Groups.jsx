import React from "react";
import { Users, Zap, Plus, CreditCard, DollarSign, Download } from "lucide-react";

const DashboardOptionalSections = () => {
  // Fake data
  const groups = [
    { name: "Investment Club", members: 5 },
    { name: "Family Finance", members: 3 },
    { name: "AI Traders", members: 8 },
  ];

  const aiInsights = [
    "Consider saving 20% of your income this month.",
    "Invest in low-risk bonds to secure your savings.",
    "Reduce dining out expenses by 15% to reach goals faster.",
  ];

  const quickActions = [
    { name: "Add Transaction", icon: CreditCard, color: "bg-indigo-500" },
    { name: "Add Saving", icon: DollarSign, color: "bg-green-500" },
    { name: "Export Data", icon: Download, color: "bg-blue-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      
      {/* Groups Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 text-white rounded-lg p-4 shadow-lg">
        <div className="flex items-center mb-3">
          <Users className="w-5 h-5 text-indigo-400 mr-2" />
          <h3 className="text-lg font-semibold">Groups</h3>
        </div>
        <ul className="space-y-2">
          {groups.map((group) => (
            <li
              key={group.name}
              className="flex justify-between items-center bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer transition-all"
            >
              <span>{group.name}</span>
              <span className="text-sm text-gray-300">{group.members} members</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Insights Section */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white rounded-lg p-4 shadow-lg">
        <div className="flex items-center mb-3">
          <Zap className="w-5 h-5 text-yellow-400 mr-2" />
          <h3 className="text-lg font-semibold">AI Insights</h3>
        </div>
        <ul className="space-y-2 text-sm">
          {aiInsights.map((insight, idx) => (
            <li
              key={idx}
              className="bg-teal-700 px-3 py-2 rounded-md text-gray-100 hover:bg-teal-600 transition-all"
            >
              {insight}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700 text-white rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-col space-y-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.name}
                className={`${action.color} flex items-center px-3 py-2 rounded-md shadow hover:opacity-90 transition-all text-sm font-semibold`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {action.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardOptionalSections;
