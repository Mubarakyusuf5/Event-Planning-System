import React, { useState } from 'react'
import { ReStats } from '../../Data'
import toast from 'react-hot-toast';
import axios from 'axios';

export const RequestUpdateModal = ({requestData, onClose, fetchRequests }) => {
    const [formData, setFormData] = useState({
        status: requestData.status || "",
      });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.status) {
          toast.error("Please fill out all fields!");
          return;
        }
        
        try {
          const response = await axios.put(
            `/api/request/updateRequest/${requestData._id}`,
            formData
          );
          toast.success(response.data.message);
          // console.log(response.data.message)
          onClose(); // Close the modal after update
          fetchRequests()
          setFormData({
            status: ""
          })
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Error updating event. Please try again.";
          toast.error(errorMessage);
          console.error("Error:", error);
        }
      };
  return (
    <div className="bg-black z-20 font-poppins py-5 md:px-4 bg-opacity-20 absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center">
        <div>
                <form
                  className="bg-white p-4 rounded-lg w-[500px]"
                  onSubmit={handleSubmit}
                >
                  <div className="text-2xl font-bold text-center mb-5">
                    Update Request Status
                  </div>
                  
                  <div className="mb-2">
                    <label htmlFor="status" className="text-base font-medium">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                    >
                      <option value="" disabled>
                        Select a status
                      </option>
                      {ReStats.map((restat, index) => (
                        <option key={index} value={restat.name}>
                          {restat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 justify-end mt-6">
                    <button
                      type="submit"
                      className="bg-blue-500 transition-all duration-300 hover:bg-blue-600 py-2 text-white font-semiBold px-4 rounded-lg"
                    >
                      Save
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
  )
}
