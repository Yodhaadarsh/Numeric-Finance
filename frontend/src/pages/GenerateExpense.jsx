import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "../config/axios.config";
import socket from "../config/socket";
import AiMessage from "../components/AiMessage";
import { useNavigate } from "react-router-dom";

const CreateExpense = () => {
  const [formData, setFormData] = useState({
    income: 10000,
    education: 2000,
    medicine: 1300,
    grocery: 1800,
    others: 2000,
    year: "",
    month: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 6 }, (_, i) => 2020 + i);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // When receiving a message
    // setLoading(true)
    socket.on("receive-data", (data) => {
      try {
       setLoading(false)
        console.log(data);
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    });

    return () => {
      socket.off("receive-data");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // socket

    // Simulate API call

    setLoading(true);
    try {
      // let res = await axios.post("/expense/create", formData);
      // console.log(res.data);
      socket.emit("send-data", {
        income: formData.income,
        education: formData.education,
        medicine: formData.medicine,
        grocery: formData.grocery,
        others: formData.others,
        year: formData.year,
        month: formData.month,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6   min-h-screen w-full bg-gray-900 text-white">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-400">
          Create Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Income and Categories */}
          {["income", "education", "medicine", "grocery", "others"].map(
            (field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize mb-1">
                  {field}
                </label>
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            )
          )}

          {/* Year Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Month Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Month</label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold text-white transition-all duration-300 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" /> Submitting...
              </>
            ) : (
              "Submit Expense"
            )}
          </button>
        </form>
      </div>
      {/* <AiMessage/> */}
    </div>
  );
};

export default CreateExpense;
