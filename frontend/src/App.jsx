import React from "react";
import MainRoutes from "./routes/MainRoutes";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Dashboard from "./components/Dashboard";

const App = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/update-password";

  return (
    <div
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
 min-h-screen text-white w-full"
    >
      {!isAuthPage && <Navbar />}
     
      
     <div className={`${!isAuthPage ? "flex   ml-64 mt-16 pt-4 px-4 md:px-8 lg:px-16 pb-8 " : ""}`}>
       {!isAuthPage && <Sidebar />}
      <MainRoutes />
     </div>
     
    </div>
  );
};

export default App;
