import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser, logout } from "./features/auth/authSlice";
import { authService } from "./appwrite/authService";
import { Navbar, Footer } from "./index";
import { Outlet } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getUser()
      .then((user) => {
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex content-between flex-wrap">
      <div className="w-full block">
        <Navbar className="absolute" />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default App;
