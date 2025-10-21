import React from "react";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="z-[101] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 p-6 mt-10 rounded-t-lg shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">

        {/* Logo / App Name */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-white">Numeric Finance</h2>
          <p className="text-sm text-gray-400 mt-1">
            Your personal finance companion.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2 text-center md:text-left">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Dashboard</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Transactions</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Investments</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Reports</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Settings</li>
          </ul>
        </div>

        {/* Contact / Social Icons */}
        <div className="flex flex-col items-center md:items-end space-y-2">
          <h3 className="font-semibold text-white">Contact & Social</h3>
          <div className="flex space-x-3 mt-1">
            <a href="mailto:support@numericfinance.com" className="hover:text-teal-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-100 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Numeric Finance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
