import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { Route, Routes } from "react-router-dom";
import { fetchData } from "./features/itemsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Cart from "./components/Cart";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { setIsLoggedIn } from "./features/userSlice";

function App() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Cart />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;

{
  /* <div className="d-flex flex-column justify-content-center align-items-center bg-light min-vh-100"></div> */
}
