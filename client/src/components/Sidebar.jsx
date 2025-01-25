import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../Context/AuthContext";

const organizerLinks = [
  { name: "Dashboard", url: "/organizer/dashboard", icon: HomeIcon },
  { name: "Manage Event", url: "/organizer/manageEvent", icon: CalendarIcon },
  { name: "Vendor Search", url: "/organizer/vendor-search", icon: ChartBarIcon },
];
const adminLinks = [
  { name: "Dashboard", url: "/admin/dashboard", icon: HomeIcon },
  { name: "Manage Users", url: "/admin/manage-users", icon: UserGroupIcon },
  { name: "Manage Request", url: "/admin/manage-request", icon: CalendarIcon },
  // { name: "Report", url: "/admin/registered-users", icon: ChartBarIcon },
];
const vendorLinks = [
  { name: "Dashboard", url: "/vendor/dashboard", icon: HomeIcon },
  {
    name: "Manage bookings",
    url: "/vendor/manage-bookings",
    icon: UserGroupIcon,
  },
  {
    name: "Manage services",
    url: "/vendor/manage-services",
    icon: CalendarIcon,
  },
  { name: "Profile", url: "/vendor/view-profile", icon: UserIcon },
  // { name: "Report", url: "/admin/registered-users", icon: ChartBarIcon },
];
const role = "Organizer";

export const Sidebar = ({isOpen}) => {
  const { user, logout } = useAuth();
  const handleLogout = ()=>{
    logout()
  }
  return (
    <>
    
    <div className="w-[270px] hidden bg-[#00539c] text-white p-4 fixed h-screen lg:flex flex-col">
      <h1 className="font-bold text-3xl mb-8">Eventee</h1>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {user?.role === "Admin"
            ? adminLinks.map(({ url, name, icon: Icon }, index) => (
                <li key={index}>
                  <NavLink
                    to={url}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-xl transition-all duration-300
             ${isActive ? "bg-[#eea47f] text-[#00539c]" : "hover:bg-[#0066c2]"}`
                    }
                  >
                    <Icon className="w-6 h-6 mr-3" />
                    {name}
                  </NavLink>
                </li>
              ))
            : user?.role === "Organizer"
            ? organizerLinks.map(({ url, name, icon: Icon }, index) => (
                <li key={index}>
                  <NavLink
                    to={url}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-xl transition-all duration-300
             ${isActive ? "bg-[#eea47f] text-[#00539c]" : "hover:bg-[#0066c2]"}`
                    }
                  >
                    <Icon className="w-6 h-6 mr-3" />
                    {name}
                  </NavLink>
                </li>
              ))
            : user?.role === "Vendor" 
            ? vendorLinks.map(({ url, name, icon: Icon }, index) => (
                <li key={index}>
                  <NavLink
                    to={url}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-xl transition-all duration-300
             ${isActive ? "bg-[#eea47f] text-[#00539c]" : "hover:bg-[#0066c2]"}`
                    }
                  >
                    <Icon className="w-6 h-6 mr-3" />
                    {name}
                  </NavLink>
                </li>
              )) : "none"
            }
        </ul>
      </nav>
      <div className="mt-auto">
        {/* <div className="flex items-center p-3 mb-4 bg-[#0066c2] rounded-xl">
          <UserCircleIcon className="w-10 h-10 mr-3" />
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-[#eea47f]">Organizer</p>
          </div>
        </div> */}
        {/* <button onClick={handleLogout} className="w-full flex items-center justify-center p-3 bg-[#eea47f] text-[#00539c] rounded-xl hover:bg-[#f0b48f] transition-all duration-300">
          <ArrowRightOnRectangleIcon className="w-6 h-6 mr-2" />
          Logout
        </button> */}
      </div>
    </div>



                              {/* mobile sidebar */}
    <div className={`w-[280px] bg-[#00539c] text-white transition-all duration-300 absolute ${isOpen ? "left-0" : "-left-[280px]"}  top-[73px] p-3  h-[615px] z-10 flex flex-col`}>
      {/* <h1 className="font-bold text-3xl mb-8">Eventee</h1> */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {user?.role === "Admin"
            ? adminLinks.map(({ url, name, icon: Icon }, index) => (
                <li key={index}>
                  <NavLink
                    to={url}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-xl transition-all duration-300
             ${isActive ? "bg-[#eea47f] text-[#00539c]" : "hover:bg-[#0066c2]"}`
                    }
                  >
                    <Icon className="w-6 h-6 mr-3" />
                    {name}
                  </NavLink>
                </li>
              ))
            : user?.role === "Organizer"
            ? organizerLinks.map(({ url, name, icon: Icon }, index) => (
                <li key={index}>
                  <NavLink
                    to={url}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-xl transition-all duration-300
             ${isActive ? "bg-[#eea47f] text-[#00539c]" : "hover:bg-[#0066c2]"}`
                    }
                  >
                    <Icon className="w-6 h-6 mr-3" />
                    {name}
                  </NavLink>
                </li>
              ))
            : user?.role === "Vendor" 
            ? vendorLinks.map(({ url, name, icon: Icon }, index) => (
                <li key={index}>
                  <NavLink
                    to={url}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-xl transition-all duration-300
             ${isActive ? "bg-[#eea47f] text-[#00539c]" : "hover:bg-[#0066c2]"}`
                    }
                  >
                    <Icon className="w-6 h-6 mr-3" />
                    {name}
                  </NavLink>
                </li>
              )) : "none"
            }
        </ul>
      </nav>
      <div className="mt-auto">
        {/* <div className="flex items-center p-3 mb-4 bg-[#0066c2] rounded-xl">
          <UserCircleIcon className="w-10 h-10 mr-3" />
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-[#eea47f]">Organizer</p>
          </div>
        </div> */}
        {/* <button onClick={handleLogout} className="w-full flex items-center justify-center p-3 bg-[#eea47f] text-[#00539c] rounded-xl hover:bg-[#f0b48f] transition-all duration-300">
          <ArrowRightOnRectangleIcon className="w-6 h-6 mr-2" />
          Logout
        </button> */}
      </div>
    </div>
    </>
  );
};
