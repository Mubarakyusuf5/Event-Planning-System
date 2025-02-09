import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Roles } from "../../../Data";
import axios from "axios";

export const AddUserModal = ({ onClose, fetchUsers }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    role: "",
    password: "",
  });

  // State to track loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullname ||
      !formData.email ||
      !formData.role ||
      !formData.password
    ) {
      toast.error("All fields are required!");
      return;
    }
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post("/auth/register", formData);
      toast.success(response.data.message);
      setFormData({
        fullname: "",
        email: "",
        role: "",
        password: "",
      });
      onClose();
      fetchUsers();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error creating user. Please try again.";
      toast.error(errorMessage);
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-black z-20 py-5 md:px-4 bg-opacity-20 absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center">
      {/* <Toaster /> */}
      <div>
        <form
          className="bg-white p-4 rounded-lg w-[500px]"
          onSubmit={handleSubmit}
        >
          <div className="text-2xl font-bold text-center mb-5">
            Add User Detail
          </div>
          <div className="mb-2">
            <label htmlFor="fullname" className="text-base font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="text-base font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email (e.g., address@example.com)"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="role" className="text-base font-medium">
              role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            >
              <option value="" disabled>
                Select a Role
              </option>
              {Roles.map((role, index) => (
                <option key={index} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="text-base font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>

          <div className="flex gap-2 justify-end mt-6">
            <button
              type="submit"
              className={`transition-all duration-300 py-2 px-4 rounded-lg font-semiBold text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="bg-gray-500 duration-300 transition-all hover:bg-gray-600 py-2 text-white font-semiBold px-4 rounded-lg"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
