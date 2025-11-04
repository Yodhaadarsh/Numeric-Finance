import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    newPassword: "",
    userId: "",
    type: "DELETE",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleNextValidation = (fieldName) => {
    if (!form[fieldName]) {
      setMessage(`Please enter your ${fieldName.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
      return false;
    }
    setMessage("");
    nextStep();
  };

  const handleSubmit = async () => {
    // Validate all fields before final submit
    if (!form.email || !form.password || !form.newPassword || !form.userId || !form.type) {
      setMessage("All fields are required.");
      return;
    }
    if (form.type !== "DELETE") {
      setMessage("You must type DELETE to confirm.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        ...form,
        confirmNewPassword: form.newPassword,
      });
      setMessage(res.data.message || "Password updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-6">
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 shadow-2xl overflow-hidden">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
          Forgot Password
        </h2>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...fadeVariants} transition={{ duration: 0.5 }}>
              <label className="block text-sm text-gray-400 mb-2">Enter your email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
                placeholder="you@example.com"
              />
              <button
                onClick={() => handleNextValidation("email")}
                className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
              >
                Find Account
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...fadeVariants} transition={{ duration: 0.5 }}>
              <label className="block text-sm text-gray-400 mb-2">Enter your old password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              />
              <div className="flex justify-between mt-5">
                <button onClick={prevStep} className="text-gray-400 hover:text-gray-200 text-sm">
                  Back
                </button>
                <button
                  onClick={() => handleNextValidation("password")}
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...fadeVariants} transition={{ duration: 0.5 }}>
              <label className="block text-sm text-gray-400 mb-2">Enter your new password</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              />
              <div className="flex justify-between mt-5">
                <button onClick={prevStep} className="text-gray-400 hover:text-gray-200 text-sm">
                  Back
                </button>
                <button
                  onClick={() => handleNextValidation("newPassword")}
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" {...fadeVariants} transition={{ duration: 0.5 }}>
              <label className="block text-sm text-gray-400 mb-2">Enter your User ID</label>
              <input
                type="text"
                name="userId"
                value={form.userId}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              />
              <div className="flex justify-between mt-5">
                <button onClick={prevStep} className="text-gray-400 hover:text-gray-200 text-sm">
                  Back
                </button>
                <button
                  onClick={() => handleNextValidation("userId")}
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" {...fadeVariants} transition={{ duration: 0.5 }}>
              <label className="block text-sm text-gray-400 mb-2">Type DELETE to confirm</label>
              <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              />
              <div className="flex justify-between mt-5">
                <button onClick={prevStep} className="text-gray-400 hover:text-gray-200 text-sm">
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 font-semibold text-white"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {message && (
          <p
            className={`text-center mt-5 text-sm ${
              message.toLowerCase().includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
