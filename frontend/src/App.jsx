import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header, Loading } from "./components/index";
import { Home, Login, Signup } from "./pages/index";
import { useSelector } from "react-redux";
const App = () => {
  const { isLoading } = useSelector((state) => state.basicSlice);
  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
