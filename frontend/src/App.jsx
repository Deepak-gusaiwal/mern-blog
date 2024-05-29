import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, Loading } from "./components/index";
import { Home, Login, Signup, Media, Protected,Profile } from "./pages/index";
import { useSelector } from "react-redux";
import { useFetchAndStoreUser } from "./hooks";
const App = () => {
  const { isLoading } = useSelector((state) => state.basicSlice);
  const fetchAndStoreUser = useFetchAndStoreUser();
  useEffect(() => {
    fetchAndStoreUser();
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/media" element={<Media />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
