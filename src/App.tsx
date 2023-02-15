import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { Route, Routes } from "react-router-dom";
import { fetchData } from "./features/itemsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Cart from "./components/Cart";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { onRegisterUser, setIsLoggedIn } from "./features/userSlice";

function App() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const user = localStorage.getItem("newUser");
    const newUser = JSON.parse(user as string);
    if (newUser) {
      dispatch(onRegisterUser(newUser));
    }
  }, []);

  return (
    <>
      <Navigation />
      <Cart />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
