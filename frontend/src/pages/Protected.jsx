import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { lookInSession } from "../utils/session";
import { tokenName } from "../utils/env";

const Protected = () => {
  const { isLogin } = useSelector((state) => state.userSlice.userData);
  const { isLoading } = useSelector((state) => state.basicSlice);
  const token = lookInSession(tokenName);
  if (isLoading) {
    return;
  }
  return isLogin && token ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
