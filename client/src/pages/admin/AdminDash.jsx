import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import {
  UserGroupIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { NavbarOrg } from "../../components/Navbar/NavbarOrg";
import { InfoCard } from "../../components/cards/InfoCard";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const stats = [
  { name: "Users", value: "50", icon: UserGroupIcon },
  { name: "Vendors", value: "5", icon: CalendarIcon },
  { name: "Requests", value: "5", icon: CalendarIcon },
  { name: "Today's Request", value: "5", icon: CalendarIcon },
  // { name: 'Revenue', value: '$12,345', icon: CurrencyDollarIcon },
];

export const AdminDash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [vendorCount, setVendorCount] = useState([]);
  const [organizerCount, setOrganizerCount] = useState([]);
  const [requestData, setRequestData] = useState("");
  const [requestToday, setRequestToday] = useState("");

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/displayUser");
      setUser(response.data);
      const vendorCount = response.data.filter(
        (user) => user.role === "Vendor"
      ).length;
      setVendorCount(vendorCount);
      const organizerCount = response.data.filter(
        (user) => user.role === "Organizer"
      ).length;
      setOrganizerCount(organizerCount);
      // console.log(response.data);
      // setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get("/api/request/displayRequest");
      const completedCount = response.data.filter(
        (request) => request.status === "Completed"
      ).length;
      setRequestData(completedCount);
      const today = new Date().toISOString().split("T")[0];

      // Filter requests by matching only the date part of createdAt
      const todayRequests = response.data.filter((request) => {
        const requestDate = new Date(request.createdAt).toISOString().split("T")[0];
        return requestDate === today;
      });
      setRequestToday(todayRequests)
      // console.log(todayRequests)
      // console.log(response.data)
      // setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Requests");
      console.error("Failed to fetch Requests:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRequests();
  }, []);

  return (
    <div className="bg-gray-50 flex min-h-screen">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 flex flex-col lg:ml-[270px]">
        <NavbarOrg onclick={handleToggle} />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-3xl font-bold text-[#00539c] mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* {stats.map((item) => (
              <div
                key={item.name}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{item.name}</p>
                    <p className="text-2xl font-bold text-[#00539c]">
                      {item.value}
                    </p>
                  </div>
                  <item.icon className="w-12 h-12 text-[#eea47f]" />
                </div>
              </div>
            ))} */}
            <Link to={"/admin/manage-users"}>
              <InfoCard
                title={"Users"}
                count={user.length}
                icon={UserGroupIcon}
              />
            </Link>
            <Link to={"/vendor-search"}>
              <InfoCard
                title={"Vendors"}
                count={vendorCount}
                icon={UserGroupIcon}
              />
            </Link>
            <InfoCard
              title={"Organizers"}
              count={organizerCount}
              icon={UserGroupIcon}
            />
            <Link to={"/admin/manage-request"}>
              <InfoCard
                title={"Completed Request"}
                count={requestData}
                icon={CheckCircleIcon}
              />
            </Link>
            <Link to={"/admin/manage-request"}>
              <InfoCard
                title={"Today's Request"}
                count={requestToday.length}
                icon={CalendarDaysIcon}
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
