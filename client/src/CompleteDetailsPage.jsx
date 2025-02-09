import React, { useState } from "react";
import axios from "axios"; 
import { States, Services } from "../src/Data";
import toast from "react-hot-toast"; 
import { useNavigate } from "react-router-dom";
import { NavbarOrg } from "./components/Navbar/NavbarOrg";
import { useAuth } from "./Context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

export const CompleteDetailsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    state: "",
    service: "",
    description: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for submit action
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/vendor/createVendor", formData);

      toast.success(response.data.message || "Vendor created successfully!");
      navigate("/vendor/dashboard");
      setFormData({
        businessName: "",
        email: "",
        phone: "",
        state: "",
        service: "",
        description: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error creating vendor details. Please try again.";
      toast.error(errorMessage);
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  // Handle form validation and modal trigger
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.businessName ||
      !formData.email ||
      !formData.phone ||
      !formData.state ||
      !formData.service ||
      !formData.description
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <NavbarOrg />
      <div className="md:py-6 md:px-10 font-poppins text-zinc-800 bg-gray-300 min-h-screen">
        <div className="flex items-center justify-center flex-col">
          <form
            onSubmit={handleFormSubmit}
            className="transition-all duration-300 w-full md:w-[600px] bg-white p-6 md:rounded-xl md:border"
          >
            <h1 className="font-medium text-2xl">Eventee</h1>
            <div className="mt-7 mb-5">
              <h1 className="font-medium text-3xl">Welcome</h1>
              <p className="text-sm">Let us know more about yourself</p>
            </div>
            <h1 className="font-medium text-2xl mb-3">Business Details</h1>

            {user?.role === "Vendor" && (
              <>
                <div className="mb-3">
                  <label htmlFor="businessName">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="p-2 border w-full rounded-md"
                    placeholder="Enter Business name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border w-full rounded-md"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="p-2 border w-full rounded-md"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="" disabled>
                      Select your state
                    </option>
                    {States.map((state, index) => (
                      <option key={index} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="service">Service Offered</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="p-2 border w-full rounded-md"
                  >
                    <option value="" disabled>
                      Select your service category
                    </option>
                    {Services.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-5">
                  <label htmlFor="description">Describe your Business</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full border rounded-md p-2"
                    placeholder="Describe your Business"
                  ></textarea>
                </div>
              </>
            )}
            <button className="w-full p-2 bg-slate-500 rounded-md mt-6 font-medium text-white">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Are you sure about the details?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <ClipLoader size={20} color="#FFFFFF" /> : "OK"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
