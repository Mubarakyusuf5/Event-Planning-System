import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { BellIcon, MagnifyingGlassIcon, PlusIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import { NavbarOrg } from "../../components/Navbar/NavbarOrg";
import { AddEventDetail } from "../../components/Modal/AddEventDetail";
import axios from "axios";
import { DeleteModal } from "../../components/Modal/DeleteModal";
import { ViewEventModal } from "../../components/Modal/ViewEventModal";
import { UpdateEventModal } from "../../components/Modal/UpdateEventModal";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";

// Custom styles for DataTable
const ActionButton = ({ icon: Icon, onClick, ariaLabel, bgColor }) => (
  <button
    onClick={onClick}
    className={`p-1 rounded-full ${bgColor} text-white hover:opacity-80 transition-opacity`}
    aria-label={ariaLabel}
  >
    <Icon className="w-4 h-4" />
  </button>
);



const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
    },
  },
  headCells: {
    style: {
      fontSize: '0.875rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
};

export const ManageUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [userData, setuserData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/displayUser");
      setuserData(response.data);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      // console.error("Failed to fetch users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateBtn = (userData) => {
    setSelectedUser(userData);
    setShowUpdateModal(true);
  };

  const handleViewModal = (userData) => {
    setSelectedUser(userData);
    setShowViewModal(true);
  };

  const handleDeleteModal = (userData) => {
    setSelectedUser(userData);
    setShowDeleteModal(true);
  };

  const handleDeleteBtn = async (id) => {
    try {
      const response = await axios.delete(`/api/users/deleteUser/${id}`);
      toast.success(response.data.message)
      setShowDeleteModal(false);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating event. Please try again.")
      console.error("Failed to delete event:", error);
    }
  };

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };
  

  
  const columns = [
    {
      name: 'Full Name',
      selector: row => row.fullname,
      sortable: true,
    },   
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      // cell: row => format(new Date(row.date), 'MMM dd, yyyy '),
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
      // cell: row => format(new Date(`1970-01-01T${row.time}Z`), 'hh:mm a'), // Add 'a' for AM/PM
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === 'Suspended' ? 'bg-yellow-100 text-yellow-800'
              : row.status === 'Active' ? 'bg-green-100 text-green-800'
              : row.status === 'Blocked' ? 'bg-red-100 text-red-800'
              : 'bg-red-100 text-blue-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <ActionButton
            icon={EyeIcon}
            onClick={() => handleViewModal(row)}
            ariaLabel="View user"
            bgColor="bg-blue-500"
          />
          <ActionButton
            icon={PencilIcon}
            onClick={() => handleUpdateBtn(row)}
            ariaLabel="Edit user"
            bgColor="bg-yellow-500"
          />
          <ActionButton
            icon={TrashIcon}
            onClick={() => handleDeleteModal(row)}
            ariaLabel="Delete user"
            bgColor="bg-red-500"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const handleToggle = ()=>{
    setIsOpen(prevIsOpen => !prevIsOpen)
    // console.log(isOpen)
  }
  return (
    <div className="bg-gray-50 flex min-h-screen font-roboto">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 flex flex-col lg:ml-[270px]">
        <NavbarOrg onclick={handleToggle} />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#00539c] font-poppins">Manage Users</h1>
            <button onClick={() => setShowModal(true)} className="py-2 px-4 bg-[#eea47f] text-white rounded-lg hover:bg-[#e8956f] transition-colors flex items-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create User
            </button>
          </div>
          {loading ? (
            <p className="text-xl text-center mt-20 font-bold">Loading users...</p>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
              <DataTable
                columns={columns}
                data={userData}
                pagination
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
                responsive
              />
            </div>
          )}
        </main>
      </div>

      {showModal && <AddEventDetail fetchUsers={fetchUsers} onClose={() => setShowModal(false)} />}
      {showUpdateModal && <UpdateEventModal userData={selectedUser} fetchUsers={fetchUsers} onClose={() => setShowUpdateModal(false)} />}
      {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={() => handleDeleteBtn(selectedUser._id)} />}
      {showViewModal && <ViewEventModal onClose={() => setShowViewModal(false)} userData={selectedUser} />}
    </div>
  );
};

