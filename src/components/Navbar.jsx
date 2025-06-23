import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../appwrite/authService";
import { logout } from "../features/auth/authSlice";
import avatar from "../assets/blogcard/avatar.svg";
import { Menu } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [onMobile, setOnMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.status);
  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate("/");
  };

  const NavLinks = () => (
    <>
      {isLoggedIn && (
        <Link
          to="/home"
          className="w-full md:w-auto px-4 py-2 flex justify-center items-center rounded-2xl text-xl hover:text-blue-400 transition-colors duration-200 hover:border-white border-transparent hover:border-2"
          onClick={() => {
            setOnMobile(false);
          }}
        >
          Home
        </Link>
      )}

      <Link
        to="/create-post"
        className="w-full md:w-auto px-4 py-2 flex justify-center items-center rounded-2xl text-xl hover:text-blue-400 transition-colors duration-200 hover:border-white border-transparent hover:border-2"
        onClick={() => {
          setOnMobile(false);
        }}
      >
        Create Post
      </Link>

      {isLoggedIn ? (
        <Link
          to="/"
          onClick={handleLogout}
          className="w-full md:w-auto px-4 py-2 flex justify-center items-center rounded-2xl text-xl hover:text-blue-400 transition-colors duration-200 hover:border-white border-transparent hover:border-2"
        >
          Logout
        </Link>
      ) : (
        <Link
          to="/login"
          className="w-full md:w-auto px-4 py-2 flex justify-center items-center rounded-2xl text-xl hover:text-blue-400 transition-colors duration-200 hover:border-white border-transparent hover:border-2"
          onClick={() => {
            setOnMobile(false);
          }}
        >
          Login
        </Link>
      )}

      {isLoggedIn ? (
        <Link
          to="/profile"
          className="w-full md:w-auto flex justify-center items-center mt-2 md:mt-0"
          onClick={() => {
            setOnMobile(false);
          }}
        >
          <img src={avatar} alt="User" className="rounded-full h-9" />
        </Link>
      ) : (
        <Link
          to="/signup"
          className="w-full md:w-auto px-4 py-2 flex justify-center items-center rounded-2xl text-xl hover:text-blue-400 transition-colors duration-200 hover:border-white border-transparent hover:border-2"
          onClick={() => {
            setOnMobile(false);
          }}
        >
          Signup
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-dark text-white shadow-md w-full">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          <div className="flex items-center">
            <img
              src={logo}
              alt="BlogSpot Logo"
              className="md:h-16 h-12 w-auto"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4 items-center">
          <NavLinks />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOnMobile(!onMobile)}
            className="cursor-pointer"
          >
            <Menu color="white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {onMobile && (
        <div className="md:hidden bg-dark px-4 pb-4 flex flex-col gap-3 items-center border-t border-gray-700">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
