import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "../../config/axios.config";
// import axios from "../../config/axios.config";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return;
    }
    setLoading(true);

    // Simulate API call delay
    try {
      let res = await axios.post("/auth/login", form, {
        withCredentials: true,
      });
      console.log(res.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Numeric Finance</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
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

          {/* Password */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition flex justify-center items-center"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              "Sign In"
            )}
          </button>

         <div className="w-full flex text-right  ">
           <NavLink className="text-xs text-right  w-full text-blue-600 ">Forgot password ?</NavLink>
         </div>
          {/* Extra links */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
