import { useState } from "react";
import { authService } from "../appwrite/authService"; // Import the service
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice"; // Import the action to set user
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    // Simple validation (ensure fields are not empty)
    if (!formData.email || !formData.password) {
      setError("Please fill out both fields.");
      return;
    }

    try {
      if (user) {
        console.log("User already logged in:", user);
        await authService.logout(); // Redirect to homepage or dashboard if already logged in
        return;
      }

      const session = await authService.login(
        formData.email,
        formData.password
      );
      if (session) {
        const userData = await authService.getUser();
        if (userData) {
          dispatch(setUser(userData)); // Dispatch the action to set user in Redux store
          navigate("/home"); // Redirect to homepage or dashboard
          setLoading(false);
        }
      }
    } catch (error) {
      console.log("Login failed:", error);
      setError("Invalid credentials or something went wrong.");
      setLoading(false);
      //toast.error("Invalid credentials or something went wrong.");
    }

    //console.log("Login Form Submitted:", formData);
    setFormData({
      email: "",
      password: "",
    });

    // Connect to Appwrite here
  };

  return (
    <div className="h-full w-[100%] mt-5 flex items-center justify-center bg-dark text-white px-4">
      <div className="w-full max-w-md bg-dark rounded-xl shadow-lg p-8 border-2 border-grey2">
        <h2 className="text-3xl font-semibold text-center mb-6">Log In</h2>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-red-600/20 text-red-400 border border-red-500 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded text-white font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button when loading
          >
            Log In
          </button>
          <p className="text-sm text-center">
            Do not have an account?{" "}
            <Link className="text-blue-400" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
