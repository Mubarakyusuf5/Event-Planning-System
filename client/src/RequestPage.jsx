import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { States } from "./Data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventName: "",
    location: "",
    date: "",
    venue: "",
    guests: "",
    budget: "",
    food: [],
    drinks: [],
    beverages: [],
    otherServices: [],
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedValues = checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value);
        return { ...prev, [name]: updatedValues };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      eventName,
      location,
      date,
      venue,
      guests,
      budget,
      message,
    } = formData;

    if (
      !name ||
      !email ||
      !phone ||
      !eventName ||
      !location ||
      !date ||
      !venue ||
      !guests ||
      !budget ||
      !message
    ) {
      toast.error("All inputs must be filled");
      return;
    }

    try {
      const response = await axios.post("/api/request/createRequest", formData);
      console.log(response);
      toast.success(response.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventName: "",
        location: "",
        date: "",
        venue: "",
        food: [],
        drinks: [],
        beverages: [],
        otherServices: [],
        guests: "",
        budget: "",
        message: "",
      });
      // navigate("/plan-my-event")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error sending the request."
      );
      // console.log(error)
    }

    // console.log(formData);
    // if (formData) {
    //   toast.success("form submitted succesfully");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Plan My Event</h1>
          <p className="text-xl lg:text-2xl font-medium max-w-2xl mx-auto">
            Create unforgettable memories with our expert event planning
            services
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-gray-800">
          Event Details
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 lg:p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex. youremail@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                min={0}
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label
                htmlFor="eventName"
                className="block text-gray-700 font-medium mb-2"
              >
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your event name"
              />
            </div>
            <div>
              <label htmlFor="location" className="text-base font-medium">
                Event Location
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div>
              <label htmlFor="date" className="text-base font-medium">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="venue"
                className="block text-gray-700 font-medium mb-2"
              >
                Venue
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter venue details"
              />
            </div>
            <div>
              <label
                htmlFor="guests"
                className="block text-gray-700 font-medium mb-2"
              >
                Number of Expected Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter expected number of guests"
              />
            </div>
            <div>
              <label
                htmlFor="budget"
                className="block text-gray-700 font-medium mb-2"
              >
                Budget (If Any)
              </label>
              <input
                type="number"
                min={0}
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your budget"
              />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              List of Services/Vendors
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Please tick box/service you require
            </p>

            <div className="space-y-8">
              {/* Food Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Food</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Nigerian Dishes",
                    "Oriental Dishes",
                    "Continental Dishes",
                    "Desserts",
                    "Finger Foods",
                    "Other Dishes",
                  ].map((food, index) => (
                    <li key={index}>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="food"
                          value={food} // Dynamic value for checkbox
                          checked={
                            Array.isArray(formData.food) &&
                            formData.food.includes(food)
                          }
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{food}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Drinks Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Drinks
                  </h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Alcoholic Cocktails",
                    "Non-Alcoholic Cocktails",
                    "Alcoholic Drinks",
                    "Non-Alcoholic Drinks",
                    "Red Wine",
                    "Champagne",
                    "Other Drinks",
                  ].map((drink, index) => (
                    <li key={index}>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="drinks"
                          value={drink} // Dynamic value for checkbox
                          checked={formData.drinks.includes(drink)}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{drink}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beverages Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Beverages
                  </h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Coffee & Tea",
                    "Fresh Juices",
                    "Soft Drinks",
                    "Smoothies",
                    "Energy Drinks",
                    "Milkshakes",
                    "Mocktails",
                    "Other Beverages",
                  ].map((beverage, index) => (
                    <li key={index}>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="beverages"
                          value={beverage} // Dynamic value for checkbox
                          checked={formData.beverages.includes(beverage)}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{beverage}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Services Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Other Services
                  </h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Photography",
                    "Event Decoration",
                    "Sound System",
                    "Event Lighting",
                    "MC Services",
                  ].map((service, index) => (
                    <li key={index}>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="otherServices"
                          value={service} // Dynamic value for checkbox
                          checked={formData.otherServices.includes(service)}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{service}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Additional Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="5"
              placeholder="Enter any additional details"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg w-full font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
