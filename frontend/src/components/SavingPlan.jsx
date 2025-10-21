import React from "react";
import { ArrowUp, ArrowDown, Shield } from "lucide-react";

const SavingPlanSimple = () => {
  // Fake data
  const currentSavings = 2100;
  const lastMonthSavings = 1800;
  const targetSavings = 5000;
  const difference = currentSavings - lastMonthSavings;
  const isPositive = difference >= 0;
  const formattedDifference = Math.abs(difference).toLocaleString("en-US", { style: "currency", currency: "USD" });
  const progressPercent = Math.min((currentSavings / targetSavings) * 100, 100);

  return (
    <div className="bg-teal-800 text-white rounded-lg p-6 shadow-lg w-full max-w-md">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-200 flex items-center space-x-2">
        <Shield className="w-5 h-5 text-green-400" />
        <span>My Saving Plan for Future</span>
      </h3>

      {/* Savings Info */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-3xl font-bold">
          {currentSavings.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </span>
        <span className={`flex items-center text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
          {formattedDifference} {isPositive ? "up" : "down"} from last month
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 bg-teal-700 rounded-full h-3 w-full">
        <div
          className="bg-green-400 h-3 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="mt-1 text-gray-200 text-sm">
        {progressPercent.toFixed(1)}% of your target savings (${targetSavings.toLocaleString()}) achieved
      </p>

      {/* Safe Investment Info */}
      <div className="mt-4 bg-teal-900 rounded-md p-3 flex items-center space-x-2">
        <Shield className="w-5 h-5 text-yellow-400" />
        <p className="text-sm text-gray-100">
          Safe Investment: Consider low-risk options to secure your savings for future goals.
        </p>
      </div>
    </div>
  );
};

export default SavingPlanSimple;
