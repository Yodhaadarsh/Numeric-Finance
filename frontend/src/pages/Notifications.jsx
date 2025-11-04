import React, { useState } from "react";
import { Bell, CheckCircle, XCircle, CreditCard, Gift, Info, Trash2 } from "lucide-react";

const NotificationsPage = () => {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "transaction",
      title: "Payment Successful",
      message: "₹4,500 sent to Aman Sharma via UPI.",
      icon: <CreditCard className="text-green-400" size={20} />,
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      type: "system",
      title: "Security Alert",
      message: "New login detected from Chrome on Windows.",
      icon: <Info className="text-blue-400" size={20} />,
      time: "10m ago",
      read: false,
    },
    {
      id: 3,
      type: "offer",
      title: "Exclusive Offer 🎁",
      message: "Earn 2x cashback on all weekend transactions.",
      icon: <Gift className="text-yellow-400" size={20} />,
      time: "1h ago",
      read: true,
    },
    {
      id: 4,
      type: "transaction",
      title: "Expense Added",
      message: "Electricity Bill of ₹1,250 recorded under Utilities.",
      icon: <CreditCard className="text-purple-400" size={20} />,
      time: "3h ago",
      read: true,
    },
  ]);

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0f19] text-gray-100 px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold mb-1 flex items-center gap-2">
            <Bell className="text-indigo-400" /> Notifications
          </h1>
          <p className="text-gray-400 text-sm">
            Stay updated with your finance activities and system alerts.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={markAllRead}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition"
          >
            Mark all as read
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium flex items-center gap-1 transition"
          >
            <Trash2 size={16} /> Clear all
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "transaction", "system", "offer"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <XCircle className="mx-auto mb-3 text-gray-500" size={40} />
            <p>No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-4 p-4 rounded-xl transition-all border ${
                n.read
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-900 border-indigo-700 shadow-lg shadow-indigo-800/20"
              } hover:scale-[1.01]`}
            >
              <div className="p-3 rounded-full bg-gray-800">
                {n.icon}
              </div>
              <div className="flex-1">
                <h3
                  className={`font-medium text-lg ${
                    n.read ? "text-gray-300" : "text-white"
                  }`}
                >
                  {n.title}
                </h3>
                <p className="text-gray-400 text-sm">{n.message}</p>
                <span className="text-xs text-gray-500">{n.time}</span>
              </div>
              {!n.read && (
                <CheckCircle className="text-indigo-500 mt-2" size={18} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
