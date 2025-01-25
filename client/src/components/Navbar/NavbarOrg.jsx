import {
  ArrowRightOnRectangleIcon,
  Bars3BottomRightIcon,
  Bars3Icon,
  BellIcon,
  CogIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

export const NavbarOrg = ({ onclick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const { user, logout } = useAuth();
  const toggleMenu = () => {
    setIsClicked((prevClicked) => !prevClicked);
    // console.log("icon clicked", isClicked);
  };
  const handleLogout = ()=>{
    logout()
  }

  return (
    <div>
      <nav className="bg-white z-20 shadow-md p-4 flex justify-between lg:justify-end items-center sticky top-0">
        <Bars3BottomRightIcon
          onClick={onclick}
          className="h-9 w-9 cursor-pointer font-bold lg:hidden "
        />
        <div className="lg:hidden text-3xl text-[#00539c] font-bold">
          Eventee
        </div>
        <div className=" items-center hidden">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00539c]"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 -ml-8" />
        </div>
        <div className="flex gap-3 lg:gap-5 ">
          <button
            className={`p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors`}
          >
            <BellIcon className={`w-6 h-6  text-[#00539c]`} />
          </button>
          <div
            onClick={toggleMenu}
            className="flex relative items-center gap-1 bg-gray-50 bg-opacity-65 rounded-full pl-3 cursor-pointer"
          >
            <div className="overflow-hidden text-zinc-600 hidden lg:block">
              {user?.email || "Guest"}
            </div>
            <div className="bg-gray-100 text-[#00539c] h-[40px] w-[40px] rounded-full font-bold font-poppins flex items-center justify-center">
              <UserIcon className="w-6 h-6" />{" "}
            </div>

            {/* profile menu */}
            <div
              className={`absolute top-16 right-1 ${
                isClicked ? "block" : "hidden"
              } w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div className="p-3">
                {/* User Section */}
                <div className="flex items-center space-x-4 border-b border-gray-200 pb-3">
                  <div className="bg-gray-100 text-[#00539c] h-[70px] w-[70px] rounded-full flex items-center justify-center">
                    <UserIcon className="h-12 w-12 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user?.fullname || "Guest"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || "Guest"}
                    </p>
                  </div>
                </div>

                {/* Account Section */}
                <nav className="mt-3 space-y-2">
                  <a
                    href="#"
                    className="flex items-center space-x-3 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <UserCircleIcon className="h-5 w-5 text-gray-400" />
                    <span>Your Profile</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <CogIcon className="h-5 w-5 text-gray-400" />
                    <span>Settings</span>
                  </a>
                </nav>

                {/* Sign Out */}
                <div className="mt-3 border-t border-gray-200 pt-3">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 rounded-md px-2 py-2 text-sm font-medium w-full text-red-600 hover:bg-red-50"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* <div
              className={`absolute top-16 right-1 ${
                isClicked ? "hidden" : "block"
              } rounded-lg bg-white shadow-md pointer-events-none`}
            >
              <div className="w-[350px] min-h-[250px] p-4">
                <div className="flex items-center gap-4 border-b pb-3">
                  <div className="bg-gray-100 text-[#00539c] h-[90px] w-[90px] rounded-full flex items-center justify-center font-poppins font-bold">
                    <UserIcon className="w-16 h-16" />
                  </div>

                  <div className="text-zinc-600 text-lg">
                    {user?.email || "Guest"}
                  </div>
                </div>

                <div className="mt-4">
                  <button className="w-full text-left text-[#00539c] py-2 px-4 rounded hover:bg-gray-100">
                    View Profile
                  </button>
                  <button className="w-full text-left text-[#00539c] py-2 px-4 rounded hover:bg-gray-100">
                    Settings
                  </button>
                  <button className="w-full text-left text-[#00539c] py-2 px-4 rounded hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </nav>
      {/* <div className='absolute lg:hidden bg-black w-[270px] min-h-[500px]'></div> */}
    </div>
  );
};
