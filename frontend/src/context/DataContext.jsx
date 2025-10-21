import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios.config";

export const DataProvider = createContext();

export const DataContext = ({ children }) => {
  // get user
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  const getUser = async () => {
    try {
      let res = await axios.get("auth/user");
      // console.log(res.data);
      setuser(res.data.user);
    } catch (error) {
      setuser(null);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [loading]);

  return (
    <DataProvider.Provider value={{ user }}>{children}</DataProvider.Provider>
  );
};

export const useData = () => useContext(DataProvider);
