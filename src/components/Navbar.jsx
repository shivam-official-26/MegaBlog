import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../appwrite/authService";
import { logout } from "../features/auth/authSlice";
import avatar from "../assets/blogcard/avatar.svg";

function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.status); // Get the login status from Redux state
  // console.log(isLoggedIn);
  const user = useSelector((state) => state.auth.user); // Get the user data from Redux state
  // console.log(user);

  const handleLogout = () => {
    authService.logout(); // Call the logout function from authService
    dispatch(logout()); // Dispatch the logout action to update the Redux state
    // window.location.reload(); // Reload the page to reflect the changes
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <nav className="bg-dark text-white shadow-md h-[112px]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          <div className="flex items-center">
            <img src={logo} alt="MegaBlog Logo" className="h-16 w-auto" />
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex justify-center items-center">
          {isLoggedIn && (
            <div
              className="w-[95px] h-[40px] flex justify-center items-center rounded-2xl text-xl 
            border border-transparent 
            hover:border-white hover:border-2 
            transition-all duration-100 ease-in-out"
            >
              <Link
                to="/home"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Home
              </Link>
            </div>
          )}

          <div
            className="w-[140px] h-[40px] flex justify-center items-center rounded-2xl text-xl 
                border border-transparent 
                hover:border-white hover:border-2 
                transition-all duration-100 ease-in-out"
          >
            <Link
              to="/create-post"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Create Post
            </Link>
          </div>
          {isLoggedIn ? (
            <div
              className="w-[95px] h-[40px] flex justify-center items-center rounded-2xl text-xl 
           border border-transparent 
           hover:border-white hover:border-2 
           transition-all duration-100 ease-in-out"
            >
              <Link
                to="/"
                className="hover:text-blue-400 transition-colors duration-200"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div
              className="w-[95px] h-[40px] flex justify-center items-center rounded-2xl text-xl 
                border border-transparent 
                hover:border-white hover:border-2 
                transition-all duration-100 ease-in-out"
            >
              <Link
                to="/login"
                className="hover:text-blue-400 transition-colors duration-300 ease-in-out"
              >
                Login
              </Link>
            </div>
          )}
          {isLoggedIn ? (
            <div className="w-[95px] h-[40px] flex justify-center items-center ">
              <Link to="/profile" className="">
                <img src={avatar} alt="" className="rounded-full h-9" />
              </Link>
            </div>
          ) : (
            <div
              className="w-[95px] h-[40px] flex justify-center items-center rounded-2xl text-xl 
            border border-transparent 
            hover:border-white hover:border-2 
            transition-all duration-100 ease-in-out"
            >
              <Link
                to="/signup"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
