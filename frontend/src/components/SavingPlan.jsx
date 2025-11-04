import React from "react";
import { ArrowRight, Calendar, Tag } from "lucide-react";

const LatestExpensePreview = ({ expenses = [] }) => {
  // ---- Fake Data for Demo ----
  const demoExpenses =
    expenses.length > 0
      ? expenses
      : [
          {
            title: "Groceries at SuperMart",
            amount: 1500,
            date: "2025-11-03",
            category: "Food",
          },
          {
            title: "Netflix Subscription",
            amount: 499,
            date: "2025-11-02",
            category: "Entertainment",
          },
          {
            title: "Medical Bill",
            amount: 1200,
            date: "2025-11-01",
            category: "Health",
          },
          {
            title: "Tuition Fees",
            amount: 3000,
            date: "2025-10-31",
            category: "Education",
          },
        ];

  // ---- Limit to 3–4 most recent ----
  const latest = demoExpenses.slice(0, 4);

  return (
    <div className="bg-[#0f172a] text-gray-100 p-6 rounded-2xl shadow-xl border border-gray-700 w-full transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-indigo-400">
          Latest Expenses
        </h2>
        <button className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          View All <ArrowRight size={16} />
        </button>
      </div>

      {/* Expense Cards */}
      <div className="space-y-4">
        {latest.map((expense, i) => (
          <div
            key={i}
            className="bg-[#1e293b] hover:bg-[#243047] rounded-xl p-4 flex justify-between items-start shadow-md border border-gray-700/60 transition-all duration-200"
          >
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-200">
                {expense.title}
              </h3>
              <div className="flex items-center text-xs text-gray-400 mt-1 space-x-2">
                <div className="flex items-center gap-1">
                  <Calendar size={12} /> <span>{expense.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Tag size={12} /> <span>{expense.category}</span>
                </div>
              </div>
              <p className="text-xs mt-3 text-emerald-400 italic">
                💡 Looks like you spent ₹{expense.amount} on{" "}
                {expense.category.toLowerCase()}, consider weekly budgeting.
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-indigo-400">
                ₹{expense.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestExpensePreview;
