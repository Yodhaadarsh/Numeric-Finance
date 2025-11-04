import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Edit3, Trash2 } from "lucide-react";

const ExpenseDetailAI = () => {
  const [expense, setExpense] = useState(null);
  const [aiMessage, setAiMessage] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fake fetching expense
    setTimeout(() => {
      const fakeExpense = {
        id: 1,
        title: "Weekend Dinner at Urban Tadka",
        amount: 1850,
        category: "Food & Dining",
        date: "November 2, 2025",
        paymentMethod: "UPI",
        notes: "Dinner with friends after exams 🎉",
      };
      setExpense(fakeExpense);
      generateAIInsights(fakeExpense);
    }, 700);
  }, []);

  const generateAIInsights = (exp) => {
    setTimeout(() => {
      setAiMessage(
        `This looks like a dining expense from your social activities. 🍽️`
      );
      setAiSuggestion(
        `💡 Suggestion: Try to keep your dining budget below ₹1500 per week to balance entertainment and savings.`
      );
    }, 1000);
  };

  const handleAIRewrite = () => {
    setLoading(true);
    setTimeout(() => {
      setExpense({
        ...expense,
        title: "Urban Tadka Dinner with Friends (AI Optimized)",
      });
      setLoading(false);
    }, 1200);
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    setExpense(null);
  };

  if (!expense)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-400 text-lg">
        {loading ? "Processing..." : "No expense found or deleted."}
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-6"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-gray-900/70 backdrop-blur-2xl border border-gray-800 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 rounded-3xl pointer-events-none"></div>

        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
          Expense Overview
        </h2>

        <div className="space-y-3 text-gray-300">
          <div>
            <span className="text-gray-400 text-sm">Title:</span>
            <p className="text-lg font-semibold text-cyan-300">{expense.title}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Amount:</span>
            <p className="text-xl font-bold text-green-400">₹{expense.amount}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Category:</span>
            <p className="text-base">{expense.category}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Date:</span>
            <p className="text-base">{expense.date}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Payment Method:</span>
            <p className="text-base">{expense.paymentMethod}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Notes:</span>
            <p className="text-base">{expense.notes}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gray-800/50 border border-gray-700 rounded-2xl p-4 flex items-start gap-3"
        >
          <Sparkles className="text-cyan-400 mt-1" />
          <div>
            <p className="text-sm text-gray-300 mb-2">{aiMessage}</p>
            <p className="text-sm text-gray-400">{aiSuggestion}</p>
          </div>
        </motion.div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleAIRewrite}
            disabled={loading}
            className="px-4 py-2 bg-blue-600/70 hover:bg-blue-700 rounded-xl flex items-center gap-2 text-sm font-semibold"
          >
            <Edit3 size={16} />
            {loading ? "AI Updating..." : "AI Rewrite"}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600/70 hover:bg-red-700 rounded-xl flex items-center gap-2 text-sm font-semibold"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseDetailAI;
