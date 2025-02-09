import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import {
  UserGroupIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { NavbarOrg } from "../../components/Navbar/NavbarOrg";
import { InfoCard } from "../../components/cards/InfoCard";
import axios from "axios";
import { Link } from "react-router-dom";

const stats = [
  { name: "Planned Events", value: "50", icon: UserGroupIcon },
  // { name: 'Total Attendees', value: '1,234', icon: UserGroupIcon },
  { name: "Upcoming Events", value: "5", icon: CalendarIcon },
  // { name: 'Revenue', value: '$12,345', icon: CurrencyDollarIcon },
];

export const OrganzerDash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [event, setEvent] = useState([]);
  const [completedCount, setCompletedCount] = useState([]);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/displayUser");
      const vendorCount = response.data.filter(
        (user) => user.role === "Vendor"
      ).length;
      setVendor(vendorCount);
      // console.log(response.data);
      // setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/event/displayEvent");
      setEvent(response.data);
      const completedCount = response.data.filter(
        (event) => event.status === "Completed"
      ).length;
      setCompletedCount(completedCount);
      // console.log(response.data);
      // setLoading(false);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);
  return (
    <div className="bg-gray-50 flex min-h-screen font-roboto">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 flex flex-col lg:ml-[270px]">
        <NavbarOrg onclick={handleToggle} isOpen={isOpen} />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-3xl font-bold font-poppins text-[#00539c] mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard
              title={"Total Events"}
              count={event.length}
              icon={BookOpenIcon}
            />
            <InfoCard
              title={"Completed Events"}
              count={completedCount}
              icon={BookOpenIcon}
            />
            <Link to={"/vendor-search"}>
              <InfoCard
                title={"Available Vendors "}
                count={vendor}
                icon={UserGroupIcon}
              />
            </Link>
          </div>
          {/* <div className='bg-white rounded-xl shadow-md p-6'>
            <h2 className='text-xl font-semibold text-[#00539c] mb-4'>Recent Activity</h2>
            <ul className='divide-y divide-gray-200'>
              {recentActivity.map((item) => (
                <li key={item.id} className='py-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium text-[#00539c]'>{item.name}</p>
                      <p className='text-sm text-gray-500'>{item.action}</p>
                    </div>
                    <p className='text-sm text-[#eea47f]'>{item.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div> */}
        </main>
      </div>
    </div>
  );
};
