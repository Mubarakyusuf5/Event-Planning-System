import { format } from "date-fns";
import React from "react";

export const RequestViewModal = ({ onClose, requestData }) => {
  const formatNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };
  return (
    <div className="bg-black z-20 font-poppins py-5 md:px-4 bg-opacity-20 absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-[550px]">
        <div className="text-2xl text-[#00539c] font-bold text-center mb-5">
          Request Information
        </div>
        <div className="mb-2 flex gap-2">
          <label htmlFor="" text-zinc-700 className="font-semibold">
            User's Fullname:
          </label>
          <p>{requestData.name}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label htmlFor="" className="text-zinc-700 font-semibold">
            Email:
          </label>
          <a
            title="Click to chat email"
            href={`mailto:${requestData.email}`}
            className="text-blue-400 transition-all duration-300"
          >
            {requestData.email}
          </a>
        </div>
        <div className="mb-2 flex gap-2">
          <label htmlFor="" className="text-zinc-700 font-semibold">
            Phone Number:
          </label>
          <a
            title="Click to call number"
            href={`tel: ${requestData.phone}`}
            className="text-blue-400 transition-all duration-300"
          >
            {requestData.phone}
          </a>
        </div>

        {/* Additional Event Details */}
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Event Name:</label>
          <p>{requestData.eventName}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Event Location:</label>
          <p>{requestData.location}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Venue:</label>
          <p>{requestData.venue}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Guests:</label>
          <p>{requestData.guests}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Date:</label>
          <p>
            {format(new Date(requestData.date), "MMM dd, yyyy")}
          </p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Budget:</label>
          <p>{formatNaira(requestData.budget)}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Food:</label>
          <p>{requestData.food.join(", ")}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Drinks:</label>
          <p>{requestData.drinks.join(", ")}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Beverages:</label>
          <p> {requestData.beverages.join(", ")}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Other Services:</label>
          <p>{requestData.otherServices.join(", ")}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="text-zinc-700 font-semibold">Message:</label>
          <p className="pt-0.5 pb-5 px-2 bg-gray-200 w-full rounded-lg">
            {requestData.message}
          </p>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <button
            type="button"
            className="bg-gray-500 duration-300 transition-all hover:bg-gray-600 py-2 text-white font-semiBold px-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
