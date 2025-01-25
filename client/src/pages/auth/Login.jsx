import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [User, setUser] = useState(null);

  useEffect(() => {
    // Parse user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    const { email, password } = formData;
    if (!email || !password) {
      return toast.error("All inputs must be field!");
    }

    try {
      const response = await axios.post("/auth/login", formData);
      console.log(response.data)
      login(response.data?.user); // Update the user context

      const { role } = response.data?.user; // Access role inside user object
      const message = response.data.message;

      redirectUser(role);

      toast.success(message || "Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "helo");
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  const roleRoutes = {
    Admin: "/admin/dashboard",
    Organizer: "/organizer/dashboard",
    Vendor: "/vendor/dashboard",
  };

  const redirectUser = async (role) => {
    if (user) {
      navigate(roleRoutes[role] || "/");
    }
  };

  useEffect(() => {
    if (user) {
      // Redirect if user is already logged in
      redirectUser(user?.role);
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center min-h-screen font-poppins items-center bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 w-[450px] shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-[#00539cff]">
          Log in to Eventee
        </h1>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Enter Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            className="w-full p-3 rounded-md border border-[#00539cff] focus:ring-2 focus:ring-[#eea47fff] focus:border-transparent"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-8">
          <label htmlFor="pass" className="block text-sm font-medium mb-2">
            Enter Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            id="pass"
            className="w-full p-3 rounded-md border border-[#00539cff] focus:ring-2 focus:ring-[#eea47fff] focus:border-transparent"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="bg-[#eea47fff] w-full py-3 rounded-xl text-white font-semibold hover:bg-[#00539cff] transition-colors duration-300">
          Login
        </button>
        <p className="text-center text-sm mt-3">
          Don't have an account?{" "}
          <Link
            to="/auth/create-account"
            className="text-[#00539cff] hover:text-[#eea47fff] transition-colors duration-300 font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
