import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Factory, Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import axios from "../../config/axios.config";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", form);
      console.log(res.data);
      setLoading(false);
      navigate("/")
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Numeric Finance</h1>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative flex items-center border-b-2 border-gray-600 focus-within:border-blue-500 transition">
            <User className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-gray-800 text-white px-1 py-2 focus:outline-none"
              disabled={loading}
            />
          </div>

          <div className="relative flex items-center border-b-2 border-gray-600 focus-within:border-blue-500 transition">
            <Mail className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-gray-800 text-white px-1 py-2 focus:outline-none"
              disabled={loading}
            />
          </div>

          <div className="relative flex items-center border-b-2 border-gray-600 focus-within:border-blue-500 transition">
            <Lock className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-gray-800 text-white px-1 py-2 focus:outline-none"
              disabled={loading}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 mr-2 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition flex justify-center items-center"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <span className="border-b w-1/4 border-gray-600"></span>
            <span>OR</span>
            <span className="border-b w-1/4 border-gray-600"></span>
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition"
            disabled={loading}
          >
            <Factory className="w-5 h-5" /> Continue with Google
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-500 hover:underline">
              Sign In
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
