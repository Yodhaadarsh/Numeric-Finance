import React, { useState } from "react";
import {
  User,
  Edit,
  Bell,
  ShieldCheck,
  CreditCard,
  LogOut,
  Settings,
  Key,
  Zap,
  Users,
  Trash2,
  Copy,
  Lock,
} from "lucide-react";
import { useData } from "../context/DataContext";

export default function ProfilePage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    updates: true,
  });

  const {user} = useData();
  console.log(user);

  const [security, setSecurity] = useState({
    twoFA: true,
    passwordLastChanged: "2025-09-12",
  });

  const [apiKeys, setApiKeys] = useState([
    { id: "live-1", name: "Production key", masked: "sk_live_****abcd" },
    { id: "dev-1", name: "Development key", masked: "sk_dev_****ef12" },
  ]);

  // const user = {
  //   name: "Priya Sharma",
  //   email: "priya@example.com",
  //   role: "Pro Trader",
  //   company: "Numeric Finance",
  //   location: "Bengaluru, India",
  //   plan: "Premium",
  // };

  return (
    <div className="min-h-screen w-full  bg-[#070b16] text-gray-100 px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Profile & Settings</h1>
        <div className="flex gap-3 mt-3 md:mt-0">
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl">
            <Bell size={18} /> Notifications
          </button>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar Card */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-xl font-semibold">
              {/* {user?.name.split(" ")[0][0]} */}
              {/* {user?.name.split(" ")[1][0]} */}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-gray-400">{user?.role}</p>
              <p className="text-xs text-gray-500">{user?.company}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-400">{user?.email}</div>
          <div className="mt-4 flex gap-2">
            <button className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-sm">
              <Edit size={14} /> Edit
            </button>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-400 px-3 py-1.5 rounded-lg text-sm text-black font-medium">
              Upgrade
            </button>
          </div>
          <div className="mt-6 border-t border-gray-800 pt-4 text-xs text-gray-400">
            Member since 2023 • {user?.plan} Plan
          </div>
        </div>

        {/* Profile Form */}
        <div className="md:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Company</label>
              <input
                type="text"
                defaultValue={user?.company}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Location</label>
              <input
                type="text"
                defaultValue={user?.location}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium">
              Save
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Notifications */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell size={18} /> Notifications
          </h2>

          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
              <span className="capitalize text-sm">
                {key === "updates" ? "Product updates" : `${key} alerts`}
              </span>
              <button
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                className={`w-12 h-6 flex items-center rounded-full ${
                  value ? "bg-indigo-500" : "bg-gray-700"
                }`}
              >
                <span
                  className={`h-5 w-5 bg-white rounded-full transform transition ${
                    value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck size={18} /> Security
          </h2>
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <span className="text-sm">Two-Factor Authentication</span>
            <button
              onClick={() => setSecurity((prev) => ({ ...prev, twoFA: !prev.twoFA }))}
              className={`w-12 h-6 flex items-center rounded-full ${
                security.twoFA ? "bg-emerald-500" : "bg-gray-700"
              }`}
            >
              <span
                className={`h-5 w-5 bg-white rounded-full transform transition ${
                  security.twoFA ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Password changed on {security.passwordLastChanged}
          </div>
        </div>
      </div>

      {/* API Keys & Billing */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* API Keys */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Key size={18} /> API Keys
          </h2>
          {apiKeys.map((key) => (
            <div
              key={key.id}
              className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
            >
              <div>
                <div className="text-sm font-medium">{key.name}</div>
                <div className="text-xs text-gray-500">{key.masked}</div>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-800 hover:bg-gray-700 p-1.5 rounded-lg">
                  <Copy size={14} />
                </button>
                <button
                  onClick={() =>
                    setApiKeys((prev) => prev.filter((k) => k.id !== key.id))
                  }
                  className="bg-red-600 hover:bg-red-500 p-1.5 rounded-lg"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Billing */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard size={18} /> Billing
          </h2>
          <div className="text-sm">Next payment: <strong>Nov 05, 2025</strong></div>
          <div className="text-xs text-gray-400 mt-2">Card: Visa •••• 4242</div>
          <div className="mt-4">
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm">
              Manage Billing
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-10 text-xs text-gray-500 border-t border-gray-800 pt-4">
        <span>Last updated: Oct 30, 2025</span>
        <div className="flex gap-3">
          <button className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg">
            <Trash2 size={14} /> Delete Account
          </button>
          <button className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg">
            <Settings size={14} /> Settings
          </button>
        </div>
      </div>
    </div>
  );
}
