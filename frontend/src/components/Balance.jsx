import React, { useMemo } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const ExpenseVisualization = ({ expenses = [] }) => {
  // ---- Fake Data for Demo ----
  const demoExpenses = useMemo(
    () =>
      expenses.length
        ? expenses
        : [
            { category: "Grocery", amount: 2500 },
            { category: "Rent", amount: 3500 },
            { category: "Entertainment", amount: 1500 },
            { category: "Education", amount: 1000 },
            { category: "Medicine", amount: 1200 },
          ],
    [expenses]
  );

  // ---- Calculate Category Totals ----
  const categoryTotals = useMemo(() => {
    return demoExpenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
  }, [demoExpenses]);

  const categories = Object.keys(categoryTotals);
  const totals = Object.values(categoryTotals);

  // ---- Pie Chart Data ----
  const pieData = {
    labels: categories,
    datasets: [
      {
        data: totals,
        backgroundColor: [
          "#60a5fa",
          "#34d399",
          "#f472b6",
          "#fbbf24",
          "#a78bfa",
          "#fb7185",
        ],
        borderWidth: 2,
        borderColor: "#1e1e1e",
      },
    ],
  };

  // ---- Bar Chart Data (Fake Trend) ----
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Expense (₹)",
        data: [5000, 7500, 6800, 7200, 6500, 7900],
        backgroundColor: "#6366f1",
        borderRadius: 10,
      },
    ],
  };

  // ---- AI Summary ----
  const aiSummary = useMemo(() => {
    const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    const top3 = sorted.slice(0, 3).map(([cat]) => cat);
    if (top3.length < 3) return "Not enough data for insights.";
    return `Your top 3 expense categories are ${top3.join(", ")}. 
Try cutting down on ${top3[2]} by 15% to hit your savings goal 🎯.`;
  }, [categoryTotals]);

  return (
    <div className="p-6 w-full transition-colors duration-500 bg-white dark:bg-[#0f172a] text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">
        Expense Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ---- Pie Chart ---- */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/30 shadow-lg rounded-2xl p-4">
          <h2 className="font-semibold text-lg mb-2 text-indigo-800 dark:text-indigo-300">
            Expense Breakdown
          </h2>
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "#e5e7eb",
                  },
                },
              },
            }}
          />
        </div>

        {/* ---- Bar Chart ---- */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/30 shadow-lg rounded-2xl p-4">
          <h2 className="font-semibold text-lg mb-2 text-blue-800 dark:text-blue-300">
            Monthly Expense Trend
          </h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: {
                  ticks: { color: "#e5e7eb" },
                  grid: { color: "#1e293b" },
                },
                y: {
                  ticks: { color: "#e5e7eb" },
                  grid: { color: "#1e293b" },
                },
              },
            }}
          />
        </div>

        {/* ---- AI Summary ---- */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/40 dark:to-green-800/30 shadow-lg rounded-2xl p-5 flex flex-col justify-center">
          <h2 className="font-semibold text-lg mb-3 text-emerald-800 dark:text-emerald-300">
            AI Expense Insights 💡
          </h2>
          <p className="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-line">
            {aiSummary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseVisualization;
