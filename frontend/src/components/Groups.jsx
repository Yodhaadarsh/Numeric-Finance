import React from "react";
import { TrendingUp, PieChart, BarChart3 } from "lucide-react";

const InvestmentInsightSection = () => {
  // ---- Fake investment data ----
  const topAssets = [
    { name: "Nifty 50 Index Fund", return: "+12.3%", type: "Mutual Fund" },
    { name: "Tata Tech Stock", return: "+8.7%", type: "Equity" },
    { name: "HDFC Corporate Bond", return: "+6.5%", type: "Debt Fund" },
  ];

  const suggestedMix = [
    { category: "Equity", percent: 50 },
    { category: "Debt", percent: 30 },
    { category: "Gold", percent: 10 },
    { category: "Cash", percent: 10 },
  ];

  return (
    <div className="bg-[#0f172a] text-gray-100 p-6 rounded-2xl shadow-xl border border-gray-700 w-full transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-indigo-400 flex items-center gap-2">
          <TrendingUp size={22} className="text-emerald-400" />
          Investment Insights
        </h2>
      </div>

      {/* Top 3 Performing Assets */}
      <div>
        <h3 className="text-gray-300 text-sm mb-3 uppercase tracking-wide">
          Top 3 Performing Assets
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {topAssets.map((asset, i) => (
            <div
              key={i}
              className="bg-[#1e293b] hover:bg-[#243047] rounded-xl p-4 border border-gray-700/60 transition-all duration-200"
            >
              <p className="text-gray-200 font-medium">{asset.name}</p>
              <p className="text-sm text-gray-400 mt-1">{asset.type}</p>
              <p
                className={`text-lg font-semibold mt-2 ${
                  asset.return.startsWith("+")
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {asset.return}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-[#1e293b] border border-indigo-500/30 rounded-xl mt-6 p-4 text-sm italic text-indigo-300">
        💡 <span className="font-medium">AI Insight:</span> Based on your
        expense trends, your top-performing area is in Equity funds. Consider
        maintaining a balanced portfolio for long-term gains.
      </div>

      {/* Suggested Investment Mix */}
      <div className="mt-6">
        <h3 className="text-gray-300 text-sm mb-3 uppercase tracking-wide flex items-center gap-2">
          <PieChart size={18} className="text-amber-400" /> Suggested Investment
          Mix
        </h3>

        <div className="space-y-2">
          {suggestedMix.map((mix, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{mix.category}</span>
                <span>{mix.percent}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    mix.category === "Equity"
                      ? "bg-emerald-400"
                      : mix.category === "Debt"
                      ? "bg-indigo-400"
                      : mix.category === "Gold"
                      ? "bg-amber-400"
                      : "bg-sky-400"
                  }`}
                  style={{ width: `${mix.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end">
        <button className="flex items-center gap-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors">
          <BarChart3 size={16} />
          View Insights
        </button>
      </div>
    </div>
  );
};

export default InvestmentInsightSection;
