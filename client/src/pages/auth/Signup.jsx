import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export const Signup = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    // phone: "",
    // serviceType: "",
    // businessDetails: "",
    // experience: "",
  });
  const [cPassword, setCPassword] = useState("")
  const navigate = useNavigate()

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setFormData({ ...formData, role: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    const { role, fullname, email, password } = formData

    if (!role, !fullname, !email, !password) {
      return toast.error("All inputs must be field!")
    }
    if (password !== cPassword) {
      return toast.error("Password don't match")
    }
    try {
      const response = await axios.post("/auth/register", formData);
      // login(response.data.user); // Update the user context
      console.log(response)
      
      // const { role } = response.data.user; // Access role inside user object
      const message = response.data.message;
      navigate("/auth/login")

      // Use a separate function to handle redirection
      // redirectUser(role);
      
      toast.success(message || "Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message);
      // setLoading(false); // Stop loading regardless of success or error
    } 

  };

  const nextStep = () => setCurrentStep(2);
  const backStep = () => setCurrentStep(1);

  return (
    <div className="flex justify-center items-center min-h-screen font-poppins bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Sign Up</h2>

        {/* Step 1: Role Selection */}
        {currentStep === 1 && (
          <div>
            <label htmlFor="role" className="block text-gray-600 font-medium mb-2">
              Select Role
            </label>
            <select
              name="role"
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Organizer">Organizer - Sign up to plan your dream event</option>
              <option value="Vendor">Vendor - Sign up to showcase your services</option>
              {/* <option value="Attendee">Attendee</option> */}
            </select>
            <button
              type="button"
              onClick={nextStep}
              disabled={!selectedRole}
              className={`w-full py-3 px-4 text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none ${
                !selectedRole ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
            <p className="text-center mt-3 text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-red-500 font-medium hover:text-red-600 transition-all duration-300">
                Login
              </Link>
            </p>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {currentStep === 2 && (
          <>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-600 font-medium mb-2">
                Full fullname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}

                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}

                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}

                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cpassword" className="block text-gray-600 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                value={cPassword}
                onChange={e => setCPassword(e.target.value)}

                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-600 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}

            {/* Role-Specific Fields */}
            {/* {selectedRole === "Vendor" && (
              <>
                <div className="mb-4">
                  <label htmlFor="serviceType" className="block text-gray-600 font-medium mb-2">
                    Service Type
                  </label>
                  <input
                    type="text"
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
    
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div> */}
                {/* <div className="mb-4">
                  <label htmlFor="businessDetails" className="block text-gray-600 font-medium mb-2">
                    Business Details
                  </label>
                  <textarea
                    id="businessDetails"
                    name="businessDetails"
                    value={formData.businessDetails}
                    onChange={handleChange}
    
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )} */}
            {/* {selectedRole === "Organizer" && (
              <div className="mb-4">
                <label htmlFor="experience" className="block text-gray-600 font-medium mb-2">
                  Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
  
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )} */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 text-white rounded-md bg-green-500 hover:bg-green-600 focus:outline-none"
            >
              Register
            </button>
            <button
              type="button"
              onClick={backStep}
              // disabled={!selectedRole}
              className={`w-full mt-1 py-3 px-4 text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none`}
            >
              Back
            </button>
          </>
        )}
      </form>
    </div>
  );
};
