import React from "react";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

const ExpenseSummary = ({ data }) => {
  // Example static data (replace with props or backend response)
  const summary = data || {
    income: 50000,
    expense: 43000,
    balance: 7000,
    topCategories: ["Rent", "Shopping", "Food"],
    insight:
      "You’ve spent 86% of your income this month — that’s quite high. Try to keep expenses below 70% for better savings stability.",
    suggestions: [
      "Reduce shopping or entertainment expenses by ₹2,000–₹3,000 next month.",
      "Try saving at least ₹10,000 per month (20% of your income).",
      "Set up automatic savings or investment plan before spending.",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0b0f18] dark:to-[#111827] text-gray-800 dark:text-gray-100 transition-all duration-500 pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">
            Your <span className="text-blue-600 dark:text-blue-400">Expense Summary</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here’s a breakdown of your financial activity this month.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#141821]/70 backdrop-blur-lg shadow-lg border border-gray-100 dark:border-gray-800 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-4">
              <ArrowUpCircle className="w-10 h-10 text-green-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
                <h2 className="text-2xl font-bold">₹{summary.income.toLocaleString()}</h2>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#141821]/70 backdrop-blur-lg shadow-lg border border-gray-100 dark:border-gray-800 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-4">
              <ArrowDownCircle className="w-10 h-10 text-red-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Expense</p>
                <h2 className="text-2xl font-bold">₹{summary.expense.toLocaleString()}</h2>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#141821]/70 backdrop-blur-lg shadow-lg border border-gray-100 dark:border-gray-800 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-4">
              <Wallet className="w-10 h-10 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Remaining Balance</p>
                <h2 className="text-2xl font-bold">₹{summary.balance.toLocaleString()}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Top Spending Categories */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#141821]/70 backdrop-blur-lg border border-gray-100 dark:border-gray-800 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Top Spending Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            {summary.topCategories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Insight Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-[#0d1220] dark:to-[#151a2d] border border-gray-100 dark:border-gray-800 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
            Insight
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {summary.insight}
          </p>
        </div>

        {/* Suggestions Section */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#141821]/70 backdrop-blur-lg border border-gray-100 dark:border-gray-800 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Smart Suggestions
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {summary.suggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ExpenseSummary;
