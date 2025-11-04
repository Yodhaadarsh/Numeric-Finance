import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile";
import GroupPage from "../pages/Group";
import AIChatPage from "../pages/AI-Chat";
import CreateExpense from "../pages/GenerateExpense";
import ViewGroup from "../pages/ViewGroup";
import AiSuggestion from "../pages/AiSuggestion";
import Notifications from "../pages/Notifications";
import ForgotPassword from "../pages/auth/ForgotPassword";
import LatestExpense from "../pages/LatestExpense";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/groups" element={<GroupPage />} />
      <Route path="/ai-chat" element={<AIChatPage />} />
      {/* <Route path='/transactions' element={<ExpenseForm/>} /> */}
      <Route path="/create/expense" element={<CreateExpense />} />
      <Route path="/group/:id" element={<ViewGroup />} />
      <Route path="/ai-suggestions" element={<AiSuggestion />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/update-password" element={<ForgotPassword />} />
       <Route path="/latest-expense" element={<LatestExpense />} />
    </Routes>
  );
};

export default MainRoutes;
