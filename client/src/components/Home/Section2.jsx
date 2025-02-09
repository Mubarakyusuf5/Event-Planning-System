import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

export const Section2 = () => {
  return (
    <div className="bg-[#00539C] font-roboto">
    <div className="min-h-[300px] bg-gray-100 py-8 px-6 lg:px-20">
      <div className="lg:w-[450px] mb-8">
        <h3 className="text-xl font-medium font-poppins mb-4">
          For Vendors
        </h3>
        <h1 className="text-3xl font-poppins md:text-4xl font-medium mb-4">
          Partner with Us
        </h1>
        <p className="text-lg md:text-xl mb-6 leading-7">
          Expand your business and reach more customers by joining our
          platform. Connect with event organizers and showcase your services
          to a wider audience.
        </p>
        <Link to={"/auth/create-account"} className="bg-[#00539C] hover:bg-[#003366] text-white py-3 px-4 rounded-xl">
          Register Now
        </Link>
      </div>
      <div className="md:flex gap-7 font-poppins text-lg">
        {[
          "Gain visibility to event planners around Nigeria and beyond.",
          "Manage your bookings and communications from one place.",
          "Access tools to track and improve your business performance."
        ].map((text, index) => (
          <div key={index} className="min-h-[150px] shadow-lg w-full md:w-[330px] p-4 mb-4 md:mb-0 font-medium bg-white text-[#00539C] rounded-xl flex items-start">
            <CheckCircleIcon className="mr-3 h-14 text-[#00539C]" />
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};
