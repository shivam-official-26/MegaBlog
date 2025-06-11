import { useState } from "react";
import { authService } from "../appwrite/authService"; // Import the service
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    setError("");
    try {
      const user = await authService.signup(
        formData.email,
        formData.password,
        formData.name
      );
      console.log("User signed up:", user);
      navigate("/login"); // Redirect or show success message
    } catch (error) {
      console.error("Signup error:", error);
      setError("Failed to create account. Please try again.");
      return;
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    // You’ll connect this to Appwrite soon
  };

  return (
    <div className="h-full w-[100%] mt-5 flex items-center justify-center bg-dark text-white px-4">
      <div className="w-full max-w-md bg-dark rounded-xl shadow-lg p-8 border-2 border-grey2">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Create Account
        </h2>
        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-red-600/20 text-red-400 border border-red-500 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded text-white font-semibold cursor-pointer"
          >
            Sign Up
          </button>
          <p className="text-sm text-center">
            Already Signup?{" "}
            <Link className="text-blue-400" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
