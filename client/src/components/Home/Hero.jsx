import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="  bg-white font-poppins transition-all duration-300 ">
      <div className="transition-all duration-300 flex justify-center items-center flex-col min-h-[450px] bg-gray-100">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Plan Your Dream Event with Ease
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4 lg:mb-8 text-center max-w-2xl">
            Your all-in-one platform for event planning, and vendor partnerships.
          </h2>
        {/* searchBar */}
        {/* <div className="flex items-center bg-white rounded-full overflow-hidden pl-4 mb-4 lg:mb-8 w-full max-w-md hover:shadow-lg transition duration-300">
            <MagnifyingGlassIcon className="text-gray-400 mr-2 h-6  " />
            <input
              type="text"
              placeholder="Search vendors..."
              className="py-3 pr-4 bg-transparent outline-none w-full"
            />
          </div> */}
        <div className="flex gap-3">
            <Link to={"/auth/login"} className="py-3 px-4 bg-[#EEA47F] text-white rounded-2xl hover:bg-[#db9774] transition-all duration-300">Get Started</Link>
            <Link to={"/plan-my-event"} className="py-3 px-4 bg-[#00539C] text-white rounded-2xl hover:bg-[#1a5486] transition-all duration-300">Plan My Event</Link>
        </div>
      </div>
    </div>
  );
};
