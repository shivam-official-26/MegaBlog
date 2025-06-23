import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect,  } from "react";
import { setUser, logout } from "./features/auth/authSlice";
import { authService } from "./appwrite/authService";
import { Navbar, Footer } from "./index";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getUser().then((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex content-between flex-wrap">
      <div className="w-full block">
        <Navbar className="absolute" />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
