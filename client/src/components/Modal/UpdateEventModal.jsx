import React, { useState, useEffect } from "react";
import { Categories, States, Status } from "../../Data";
import toast from "react-hot-toast";
import axios from "axios";

export const UpdateEventModal = ({ eventData, onClose, fetchEvents }) => {
  const [formData, setFormData] = useState({
    eventName: eventData.eventName || "",
    category: eventData.category || "",
    location: eventData.location || "",
    venue: eventData.venue || "",
    maxAttendee: eventData.maxAttendee || "",
    date: eventData.date || "",
    time: eventData.time || "",
    budget: eventData.budget || "",
    status: eventData.status || "",
  });

  // useEffect(() => {
  //   if (eventData) {
  //     setFormData({
  //       eventName: eventData.eventName || "",
  //       category: eventData.category || "",
  //       location: eventData.location || "",
  //       venue: eventData.venue || "",
  //       maxAttendee: eventData.maxAttendee || "",
  //       date: eventData.date || "",
  //       time: eventData.time || "",
  //       budget: eventData.budget || "",
  //     });
  //   }
  // }, [eventData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.eventName ||
      !formData.category ||
      !formData.location ||
      !formData.venue ||
      !formData.maxAttendee ||
      !formData.date ||
      !formData.time ||
      !formData.budget ||
      !formData.status
    ) {
      toast.error("Please fill out all fields!");
      return;
    }
    try {
      const response = await axios.put(
        `/api/event/updateEvent/${eventData._id}`,
        formData
      );
      toast.success(response.data.message);
      onClose(); // Close the modal after update
      fetchEvents()
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error updating event. Please try again.";
      toast.error(errorMessage);
      console.error("Error:", error);
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
            Update Event Detail
          </div>
          <div className="mb-2">
            <label htmlFor="eventName" className="text-base font-medium">
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              id="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              placeholder="Enter event name"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="category" className="text-base font-medium">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            >
              <option value="" disabled>
                Select a category
              </option>
              {Categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="text-base font-medium">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            >
              <option value="" disabled>
                Select your location
              </option>
              {States.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="venue" className="text-base font-medium">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={formData.venue}
              onChange={handleInputChange}
              placeholder="Enter a venue ex: address"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="maxAttendee" className="text-base font-medium">
              Max Attendee
            </label>
            <input
              type="number"
              min={0}
              name="maxAttendee"
              id="maxAttendee"
              value={formData.maxAttendee}
              onChange={handleInputChange}
              placeholder="ex. 50, 100 ..."
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="budget" className="text-base font-medium">
              Budget
            </label>
            <input
              type="number"
              min={0}
              name="budget"
              id="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Enter a budget"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="date" className="text-base font-medium">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="time" className="text-base font-medium">
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
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
              {Status.map((stat, index) => (
                <option key={index} value={stat.name}>
                  {stat.name}
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
  );
};