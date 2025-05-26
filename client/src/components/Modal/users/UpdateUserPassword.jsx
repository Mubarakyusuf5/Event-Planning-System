import React, { useState } from "react";
// import { Roles, Stats } from "../../../Data";
import { toast } from "react-hot-toast";
import axios from "axios";

export const UpdateUserPassword = ({userData, onClose, fetchUsers }) => {
  const [formData, setFormData] = useState({
    password: "",
    cPassword: "",
  });
//   console.log(formData)
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }
    if (formData.password !== formData.cPassword) {
      toast.error("Password does'nt match");
      return;
    }

    setLoading(true); // Set loading to true during submission
    try {
      const response = await axios.put(
        `/api/users/updateUserPassword/${userData._id}`,
        formData
      );
      console.log(response)
      toast.success(response.data.message);
      fetchUsers(); // Refresh the events list
      onClose(); // Close the modal after update
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error updating user password. Please try again.";
      toast.error(errorMessage);
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  return (
    <div className="bg-black z-20 py-5 md:px-4 bg-opacity-20 absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center">
      <div>
        <form
          className="bg-white p-4 rounded-lg w-[500px]"
          onSubmit={handleSubmit}
        >
          <div className="text-2xl font-bold text-center mb-5">
            Update User Password
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
          <div className="mb-2">
            <label htmlFor="cPassword" className="text-base font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="cPassword"
              id="cPassword"
              value={formData.cPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="flex gap-2 justify-end mt-6">
            <button
              type="submit"
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition-all duration-300 py-2 text-white font-semiBold px-4 rounded-lg`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="bg-gray-500 duration-300 transition-all hover:bg-gray-600 py-2 text-white font-semiBold px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
