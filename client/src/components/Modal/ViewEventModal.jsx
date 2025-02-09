import React from 'react'
import { format } from 'date-fns';

export const ViewEventModal = ({onClose, eventData}) => {
  // eventName: "",
  //   category: "",
  //   location: "",
  //   venue: "",
  //   maxAttendee: "",
  //   date: "",
  //   time: "",
  //   budget: "",

    const formatNaira = (amount) => {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(amount);
    };


  return (
    <div className="bg-black z-20 py-5 md:px-4 bg-opacity-20 absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-[500px]">
        <div className="text-2xl text-[#00539c] font-bold text-center mb-5">
          Event Information
        </div>
        <div className="mb-2 flex gap-2">
          <label htmlFor="" className="font-semibold">
            Event Name:
          </label>
          <p>{eventData.eventName}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="font-semibold">Category</label>
          <p>{eventData.category}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="font-semibold">Location:</label>
          <p>{eventData.location}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="font-semibold">Venue:</label>
          <p>{eventData.venue}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="font-semibold">Date:</label>
          <p>{format(new Date(eventData.date), 'MMM dd, yyyy ')}</p>

        </div>
        <div className="mb-2 flex gap-2">
          <label className="font-semibold">Time:</label>
          <p>{format(new Date(`1970-01-01T${eventData.time}Z`), 'hh:mm a')}</p>
        </div>
        <div className="mb-2 flex gap-2">
          <label className="font-semibold">Budget:</label>
          <p>{formatNaira(eventData.budget)}</p>
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
  )
}
