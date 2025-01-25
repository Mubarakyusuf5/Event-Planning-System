import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 flex items-center justify-between font-sans sticky top-0 border-b">
      {/* Logo and Navigation Links */}
      <div className="flex gap-8 items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl text-[#00539c] font-bold">
          Eventee
        </Link>

        {/* Navigation Links */}
        <div className=" gap-6 hidden lg:flex">
          {[ "Plan Events", "Need Help"].map((item) => (
            <Link
              key={item}
              to="/"
              className="text-[#00539c] hover:text-[#eea47f] transition duration-200"
            >
              {item}
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
    </nav>
  )
}

