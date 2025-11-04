import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingDown,
  PiggyBank,
  Percent,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function TopSummary() {
  const data = {
    income: 85000,
    expense: 63000,
    balance: 22000,
    savingsRate: 26,
    month: "November 2025",
    aiTip: "Your savings are 4% higher than last month. Keep it up!",
  };

  const cards = [
    {
      icon: <Wallet className="text-green-400" size={24} />,
      title: "Total Income",
      value: `₹ ${data.income.toLocaleString()}`,
      color: "from-emerald-500/20 to-green-500/10 border-green-500/40",
    },
    {
      icon: <TrendingDown className="text-red-400" size={24} />,
      title: "Total Expense",
      value: `₹ ${data.expense.toLocaleString()}`,
      color: "from-red-500/20 to-rose-500/10 border-red-500/40",
    },
    {
      icon: <PiggyBank className="text-cyan-400" size={24} />,
      title: "Remaining Balance",
      value: `₹ ${data.balance.toLocaleString()}`,
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/40",
    },
    {
      icon: <Percent className="text-violet-400" size={24} />,
      title: "Savings Rate",
      value: `${data.savingsRate}%`,
      color: "from-violet-500/20 to-purple-500/10 border-violet-500/40",
    },
    {
      icon: <Calendar className="text-amber-400" size={24} />,
      title: "Month",
      value: data.month,
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-10 px-6 md:px-12 rounded-3xl shadow-lg border border-gray-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Financial Overview
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Here’s how you’re doing this month
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl shadow-md cursor-pointer"
          >
            <Sparkles size={18} />
            <span className="text-sm font-medium">AI Suggest</span>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl p-5 border backdrop-blur-xl bg-gradient-to-br ${card.color} hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">{card.title}</span>
                  <span className="text-xl font-semibold mt-1 text-white">
                    {card.value}
                  </span>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-xl">{card.icon}</div>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-transparent blur-3xl opacity-10"
                animate={{ x: ["0%", "100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* AI Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-start gap-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-5"
        >
          <Sparkles className="text-cyan-400 mt-1" />
          <div>
            <h4 className="font-semibold text-cyan-300">AI Tip</h4>
            <p className="text-gray-300 text-sm mt-1">{data.aiTip}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
