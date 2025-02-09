import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const indicate =
    user?.role === "Admin" ||
    user?.role === "Organizer" ||
    user?.role === "Vendor";

  const links = [
    { name: "Home", url: "/" },
    { name: "Plan My Events", url: "/plan-my-event" },
  ];
  return (
    <>
      <nav
        className={`bg-white py-4 px-6 ${
          indicate ? "hidden" : "flex"
        }  items-center justify-between font-sans sticky top-0 border-b`}
      >
        {/* Logo and Navigation Links */}
        <div className="flex gap-8 items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl text-[#00539c] font-bold">
          Elegance and Co.
          </Link>

          {/* Navigation Links */}
          <div className=" gap-6 hidden lg:flex">
            {links.map((link, index) => (
              <Link
                key={link.name}
                to={link.url}
                className="text-[#00539c] hover:text-[#eea47f] transition duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar and CTA Buttons */}
        <div className="hidden gap-4 items-center lg:flex">
          {/* Search Bar
        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden pl-4 shadow-sm hover:shadow-md transition duration-300">
          <MagnifyingGlassIcon className="text-gray-400 mr-2 h-6  " />
          <input
            type="text"
            placeholder="Search vendor..."
            className="py-2 pr-4 bg-transparent outline-none w-[250px] "
          />
        </div> */}

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Link
              to="/auth/login"
              className="py-2 px-4 text-[#00539c] hover:text-[#eea47f] transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/auth/create-account"
              className="bg-[#00539c] py-2 px-6 text-white font-medium hover:bg-[#eea47f] rounded-xl transition-all duration-300"
            >
              Signup
            </Link>
          </div>
        </div>

        {/* toggle icon */}
        <div
          onClick={toggleMenu}
          className="p-0.5 lg:hidden bg-gray-100 rounded-lg "
        >
          <Bars3Icon className="w-9 h-9 cursor-pointer text-zinc-600" />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`bg-white transition-all duration-300 p-4 w-[280px] h-[650px] z-10 fixed shadow-lg ${
          isOpen ? "left-0" : "-left-[280px]"
        }`}
      >
        {/* Navigation Links */}
        <div className="flex flex-col gap-6 mb-6">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              onClick={()=> toggleMenu()}
              className="text-[#00539c] font-medium text-lg hover:text-[#eea47f] px-2 py-1 transition duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-col gap-4 mt-auto">
          <Link
            to="/auth/login"
            className="py-2 px-4 text-[#00539c] font-medium text-center border border-[#00539c] rounded-md hover:text-[#eea47f] hover:border-[#eea47f] transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/auth/create-account"
            className="bg-[#00539c] py-3 px-6 text-center text-white font-semibold rounded-xl hover:bg-[#eea47f] hover:text-[#00539c] transition-all duration-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </>
  );
};
