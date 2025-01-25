import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

export const Hero = () => {
  return (
    <div className=" md:p-6 bg-white font-poppins transition-all duration-300 ">
      <div className="transition-all duration-300 flex justify-center items-center flex-col min-h-[450px]  md:rounded-2xl bg-violet-200">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Plan Your Dream Event with Ease
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4 lg:mb-8 text-center max-w-2xl">
            Your all-in-one platform for event planning, and vendor partnerships.
          </h2>
        {/* searchBar */}
        <div className="flex items-center bg-white rounded-full overflow-hidden pl-4 mb-4 lg:mb-8 w-full max-w-md hover:shadow-lg transition duration-300">
            <MagnifyingGlassIcon className="text-gray-400 mr-2 h-6  " />
            <input
              type="text"
              placeholder="Search vendors..."
              className="py-3 pr-4 bg-transparent outline-none w-full"
            />
          </div>
        {/* <div className="flex gap-3">
            <button className="py-3 px-4 bg-gray-900 text-white rounded-2xl hover:bg-slate-600 transition-all duration-300">Browse Events</button>
            <button className="py-3 px-4 bg-gray-900 text-white rounded-2xl hover:bg-slate-600 transition-all duration-300">Host Events</button>
        </div> */}
      </div>
    </div>
  );
};
