import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { lookInSession } from "../utils/session";

const Protected = () => {
  const { isLogin } = useSelector((state) => state.userSlice.userData);
  const token = lookInSession("token");
  return isLogin && token ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
