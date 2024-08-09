import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true); //true because useEffect starts right away when page starts loading
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="bg-[#16161a] text-[#fffffe] text-xl flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
