import React from "react";
// import {
//   CalendarIcon,
//   UserGroupIcon,
//   BuildingStorefrontIcon,
//   BellIcon,
// } from "@heroicons/react/24/outline";

export const Card = ({ title, description, Icon, Key }) => {
  return (
    <div key={Key} className="min-h-[170px] w-full lg:w-[300px] bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-4">
        {/* Render the Icon dynamically */}
        <Icon className="w-8 h-8 mr-3 text-gray-700" />
        <h2 className="font-medium font-poppins text-xl">{title}</h2>
      </div>
      <p className="text-sm text-gray-600 font-roboto">{description}</p>
    </div>
  );
};
